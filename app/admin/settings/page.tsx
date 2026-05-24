'use client';

import { useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { toast } from '@/components/admin/Toast';

export default function SettingsPage() {
  const sb = useMemo(() => createSupabaseBrowserClient(), []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [row, setRow] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { data } = await sb.from('chatbot_settings').select('*').limit(1).maybeSingle();
      setRow(data ?? {
        business_name: 'Trip Trekker',
        bot_name: 'Trekker Assistant',
        welcome_message: '',
        fallback_message: '',
        primary_color: '#059669',
      });
      setLoading(false);
    })();
  }, [sb]);

  async function save() {
    setSaving(true);
    let res;
    if (row?.id) {
      const { id, created_at, updated_at, ...rest } = row;
      res = await sb.from('chatbot_settings').update(rest).eq('id', id);
    } else {
      res = await sb.from('chatbot_settings').insert(row);
    }
    setSaving(false);
    if (res.error) toast('err', res.error.message);
    else toast('ok', 'Settings saved.');
  }

  if (loading) return <div className="p-6 flex items-center gap-2 text-slate-500"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</div>;

  const f = (k: string) => row?.[k] ?? '';
  const set = (k: string, v: any) => setRow({ ...row, [k]: v });

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Chatbot Settings</h1>
      <p className="text-sm text-slate-600 mt-1">These values power the chatbot and contact section.</p>

      <div className="card p-6 mt-6 grid sm:grid-cols-2 gap-4">
        <Field label="Business name"><input className="input" value={f('business_name')} onChange={(e) => set('business_name', e.target.value)} /></Field>
        <Field label="Bot name"><input className="input" value={f('bot_name')} onChange={(e) => set('bot_name', e.target.value)} /></Field>
        <Field label="Welcome message" full><textarea className="input min-h-[100px]" value={f('welcome_message')} onChange={(e) => set('welcome_message', e.target.value)} /></Field>
        <Field label="Fallback message" full><textarea className="input min-h-[100px]" value={f('fallback_message')} onChange={(e) => set('fallback_message', e.target.value)} /></Field>
        <Field label="Primary color"><input className="input" value={f('primary_color')} onChange={(e) => set('primary_color', e.target.value)} placeholder="#059669" /></Field>
        <Field label="Support email"><input className="input" value={f('support_email')} onChange={(e) => set('support_email', e.target.value)} /></Field>
        <Field label="Support phone"><input className="input" value={f('support_phone')} onChange={(e) => set('support_phone', e.target.value)} /></Field>
        <Field label="Business hours"><input className="input" value={f('business_hours')} onChange={(e) => set('business_hours', e.target.value)} /></Field>
        <Field label="Office location" full><input className="input" value={f('office_location')} onChange={(e) => set('office_location', e.target.value)} /></Field>
      </div>

      <div className="mt-4 flex justify-end">
        <button onClick={save} disabled={saving} className="btn-primary">
          {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save settings
        </button>
      </div>
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}
