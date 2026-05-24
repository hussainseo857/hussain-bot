'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle, BookOpen, Map, Mountain, Package, Calendar, MessageSquare, ArrowRight,
} from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

type Counts = Record<string, number>;

const CARDS = [
  { table: 'faqs', label: 'FAQs', icon: HelpCircle, href: '/admin/faqs', color: 'from-emerald-500 to-teal-600' },
  { table: 'knowledge_base', label: 'Knowledge Base', icon: BookOpen, href: '/admin/knowledge', color: 'from-sky-500 to-indigo-600' },
  { table: 'destinations', label: 'Destinations', icon: Map, href: '/admin/destinations', color: 'from-amber-400 to-orange-600' },
  { table: 'trekking_routes', label: 'Trekking Routes', icon: Mountain, href: '/admin/routes', color: 'from-rose-400 to-pink-600' },
  { table: 'travel_packages', label: 'Travel Packages', icon: Package, href: '/admin/packages', color: 'from-violet-500 to-purple-700' },
  { table: 'sample_bookings', label: 'Bookings', icon: Calendar, href: '/admin/bookings', color: 'from-lime-500 to-green-700' },
  { table: 'conversations', label: 'Conversations', icon: MessageSquare, href: '/admin/conversations', color: 'from-cyan-500 to-blue-600' },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sb = createSupabaseBrowserClient();
    (async () => {
      const result: Counts = {};
      await Promise.all(
        CARDS.map(async (c) => {
          const { count } = await sb.from(c.table).select('*', { count: 'exact', head: true });
          result[c.table] = count ?? 0;
        })
      );
      setCounts(result);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="text-sm text-slate-600 mt-1">Overview of your Trip Trekker knowledge base and content.</p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CARDS.map((c) => (
          <Link key={c.table} href={c.href} className="card p-5 hover:shadow-soft transition group">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center mb-4`}>
              <c.icon className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">{c.label}</div>
            <div className="text-3xl font-bold text-slate-900 mt-1">
              {loading ? '—' : counts[c.table] ?? 0}
            </div>
            <div className="mt-3 text-xs text-brand-700 flex items-center gap-1 group-hover:gap-2 transition-all">
              Manage <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 card p-6">
        <h2 className="font-semibold text-slate-900">Quick tips</h2>
        <ul className="mt-3 text-sm text-slate-600 list-disc pl-5 space-y-1.5">
          <li>Add or update FAQs, destinations, routes, and packages — the chatbot will use them immediately.</li>
          <li>Edit the welcome message, fallback message and contact details under <strong>Chatbot Settings</strong>.</li>
          <li>Bookings are private — only admins can view them. The chatbot looks them up by booking ID through a secure API route.</li>
        </ul>
      </div>
    </div>
  );
}
