'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Mountain, Loader2 } from 'lucide-react';

type Msg = { role: 'user' | 'assistant'; content: string; ts: number };

const QUICK_ACTIONS = [
  'Best destinations',
  'Trekking routes',
  'Travel packages',
  'Track booking TT1001',
  'Gear checklist',
  'Safety tips',
  'Contact support',
];

const WELCOME =
  "Hi! I'm Trekker Assistant from Trip Trekker. I can help you with destinations, trekking routes, travel packages, booking status, trip planning, safety guidance, gear checklists, best seasons, payments, cancellations, and contact support. What would you like help with?";

export default function ChatWidget({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: WELCOME, ts: Date.now() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  async function send(text: string) {
    const msg = text.trim();
    if (!msg || loading) return;
    setError(null);
    setMessages((m) => [...m, { role: 'user', content: msg, ts: Date.now() }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, conversationId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? 'Request failed');
      if (data.conversationId) setConversationId(data.conversationId);
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: data.reply ?? '...', ts: Date.now() },
      ]);
    } catch (e: any) {
      console.error(e);
      setError("Couldn't reach the assistant. Please try again.");
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            'Trip Trekker assistant is temporarily unavailable. Please contact support.',
          ts: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-mountain-gradient text-white shadow-soft flex items-center justify-center hover:scale-105 transition"
        aria-label="Open chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed z-50 bg-white border border-slate-200 shadow-2xl
                     bottom-0 right-0 left-0 sm:bottom-24 sm:right-5 sm:left-auto
                     sm:w-[400px] h-[85vh] sm:h-[600px] sm:rounded-2xl
                     flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-mountain-gradient text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <Mountain className="w-5 h-5" />
            </div>
            <div className="flex-1 leading-tight">
              <div className="font-semibold">Trekker Assistant</div>
              <div className="text-xs flex items-center gap-1.5 text-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-300 inline-block" />
                Online · Trip Trekker support
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/10 rounded-lg" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} content={m.content} />
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <div className="flex gap-1 px-3 py-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <Dot /> <Dot delay="0.15s" /> <Dot delay="0.3s" />
                </div>
              </div>
            )}
            {error && (
              <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
          </div>

          {/* Quick actions */}
          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {QUICK_ACTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs px-2.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-slate-200 bg-white flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about destinations, routes, packages, bookings…"
              className="input"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary px-3 py-2"
              aria-label="Send"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function Bubble({ role, content }: { role: 'user' | 'assistant'; content: string }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap text-sm px-3.5 py-2.5 rounded-2xl shadow-sm ${
          isUser
            ? 'bg-brand-600 text-white rounded-br-md'
            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md'
        }`}
      >
        {content}
      </div>
    </div>
  );
}

function Dot({ delay = '0s' }: { delay?: string }) {
  return (
    <span
      className="w-2 h-2 rounded-full bg-slate-400 inline-block animate-bounce"
      style={{ animationDelay: delay }}
    />
  );
}
