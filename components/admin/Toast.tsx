'use client';
import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

type Toast = { id: number; kind: 'ok' | 'err'; text: string };

let push: ((kind: 'ok' | 'err', text: string) => void) | null = null;

export function toast(kind: 'ok' | 'err', text: string) {
  push?.(kind, text);
}

export default function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);
  useEffect(() => {
    push = (kind, text) => {
      const id = Date.now() + Math.random();
      setItems((arr) => [...arr, { id, kind, text }]);
      setTimeout(() => setItems((arr) => arr.filter((t) => t.id !== id)), 3500);
    };
    return () => { push = null; };
  }, []);
  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          className={`px-3 py-2 rounded-lg shadow-soft text-sm flex items-center gap-2 ${
            t.kind === 'ok' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
          }`}
        >
          {t.kind === 'ok' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {t.text}
        </div>
      ))}
    </div>
  );
}
