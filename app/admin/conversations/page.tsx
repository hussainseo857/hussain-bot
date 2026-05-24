'use client';

import { useEffect, useMemo, useState } from 'react';
import { Loader2, MessageSquare } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

type Conv = { id: string; user_label: string | null; created_at: string };
type Msg = { id: string; role: string; content: string; created_at: string };

export default function ConversationsPage() {
  const sb = useMemo(() => createSupabaseBrowserClient(), []);
  const [convs, setConvs] = useState<Conv[]>([]);
  const [active, setActive] = useState<Conv | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await sb
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      setConvs((data as Conv[]) ?? []);
      setLoading(false);
    })();
  }, [sb]);

  async function openConv(c: Conv) {
    setActive(c);
    const { data } = await sb
      .from('messages')
      .select('*')
      .eq('conversation_id', c.id)
      .order('created_at', { ascending: true });
    setMsgs((data as Msg[]) ?? []);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Conversations</h1>
      <p className="text-sm text-slate-600 mt-1">Chatbot conversations stored in your database.</p>

      <div className="mt-6 grid lg:grid-cols-3 gap-5">
        <div className="card overflow-hidden lg:col-span-1">
          <div className="px-4 py-3 border-b border-slate-100 text-sm font-medium text-slate-700">All conversations</div>
          <div className="max-h-[70vh] overflow-y-auto divide-y divide-slate-100">
            {loading ? (
              <div className="p-6 flex items-center gap-2 text-slate-500"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</div>
            ) : convs.length === 0 ? (
              <div className="p-6 text-sm text-slate-500">No conversations yet.</div>
            ) : convs.map((c) => (
              <button
                key={c.id}
                onClick={() => openConv(c)}
                className={`w-full text-left px-4 py-3 hover:bg-slate-50 ${active?.id === c.id ? 'bg-brand-50' : ''}`}
              >
                <div className="text-sm font-medium text-slate-800 truncate flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-brand-600" /> {c.user_label ?? 'Visitor'}
                </div>
                <div className="text-xs text-slate-500">{new Date(c.created_at).toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="card p-4 lg:col-span-2 min-h-[60vh]">
          {!active ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-sm">
              Select a conversation to view messages.
            </div>
          ) : (
            <div className="space-y-3">
              {msgs.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] text-sm px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap ${
                    m.role === 'user' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
