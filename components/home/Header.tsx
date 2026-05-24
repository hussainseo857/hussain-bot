'use client';
import Link from 'next/link';
import { Mountain, Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#routes', label: 'Trekking Routes' },
  { href: '#packages', label: 'Packages' },
  { href: '#safety', label: 'Safety' },
  { href: '#faqs', label: 'FAQs' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-mountain-gradient flex items-center justify-center shadow-soft">
            <Mountain className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-slate-900">Trip Trekker</div>
            <div className="text-[11px] text-slate-500">Adventure · Trekking · Travel</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="px-3 py-2 rounded-lg text-sm text-slate-700 hover:text-brand-700 hover:bg-brand-50 transition">
              {l.label}
            </a>
          ))}
          <Link href="/admin/login" className="ml-2 btn-secondary text-sm py-2">Admin</Link>
        </nav>
        <button className="md:hidden btn-ghost" onClick={() => setOpen((s) => !s)} aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-4 py-2 flex flex-col">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-slate-700">
                {l.label}
              </a>
            ))}
            <Link href="/admin/login" className="py-2 text-brand-700 font-medium">Admin</Link>
          </div>
        </div>
      )}
    </header>
  );
}
