'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  HelpCircle,
  BookOpen,
  Map,
  Mountain,
  Package,
  Tag,
  Calendar,
  Settings,
  MessageSquare,
  Menu,
  LogOut,
  X,
} from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/knowledge', label: 'Knowledge Base', icon: BookOpen },
  { href: '/admin/destinations', label: 'Destinations', icon: Map },
  { href: '/admin/routes', label: 'Trekking Routes', icon: Mountain },
  { href: '/admin/packages', label: 'Travel Packages', icon: Package },
  { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
  { href: '/admin/topics', label: 'Allowed Topics', icon: Tag },
  { href: '/admin/settings', label: 'Chatbot Settings', icon: Settings },
  { href: '/admin/conversations', label: 'Conversations', icon: MessageSquare },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const sb = createSupabaseBrowserClient();
    sb.auth.getUser().then(({ data }) => {
      if (!data.user) router.replace('/admin/login');
      else setEmail(data.user.email ?? 'admin');
    });
  }, [router]);

  async function logout() {
    const sb = createSupabaseBrowserClient();
    await sb.auth.signOut();
    router.replace('/admin/login');
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar — mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>
      )}
      <aside
        className={`fixed lg:static z-50 inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col
                    transition-transform ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="h-16 px-4 flex items-center gap-2 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-mountain-gradient flex items-center justify-center">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-slate-900">Trip Trekker</div>
            <div className="text-[11px] text-slate-500">Admin</div>
          </div>
          <button className="ml-auto lg:hidden btn-ghost" onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {nav.map((n) => {
            const active = path === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`mx-2 my-0.5 px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition ${
                  active
                    ? 'bg-brand-50 text-brand-700 font-medium'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <n.icon className="w-4 h-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-slate-100">
          <div className="text-xs text-slate-500 px-2 truncate">{email}</div>
          <button onClick={logout} className="mt-2 w-full btn-secondary text-sm py-2">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden h-14 bg-white border-b border-slate-200 px-4 flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="btn-ghost"><Menu className="w-5 h-5" /></button>
          <div className="font-semibold text-slate-900">Trip Trekker · Admin</div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
