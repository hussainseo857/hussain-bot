'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQ } from '@/lib/types';

const FALLBACK: FAQ[] = [
  { id: '1', question: 'What is the best season for trekking?', answer: 'For most northern Pakistan treks, May–September. High-altitude routes are best in June–August.', category: null, is_active: true },
  { id: '2', question: 'How do I book a trip?', answer: 'Submit an inquiry via the website; our team confirms availability within 24 hours.', category: null, is_active: true },
  { id: '3', question: 'What gear do I need?', answer: 'Trekking shoes, layered clothing, waterproof jacket, backpack, water bottle, and basic first-aid kit.', category: null, is_active: true },
  { id: '4', question: 'What is your cancellation policy?', answer: '14+ days: 90% refund. 7–13 days: 50%. <7 days: non-refundable but one reschedule is offered.', category: null, is_active: true },
  { id: '5', question: 'Which routes are beginner-friendly?', answer: 'Margalla Hills Trail, Mushkpuri Top, and Miranjani Trek are great for beginners.', category: null, is_active: true },
];

export default function FAQs({ data }: { data?: FAQ[] }) {
  const list = (data && data.length ? data : FALLBACK).slice(0, 5);
  const [open, setOpen] = useState<string | null>(list[0]?.id ?? null);
  return (
    <section id="faqs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="section-title">Frequently Asked Questions</h2>
      <p className="section-sub">Quick answers — or ask the Trekker Assistant for anything else.</p>
      <div className="mt-8 grid gap-3">
        {list.map((f) => (
          <button
            key={f.id}
            onClick={() => setOpen(open === f.id ? null : f.id)}
            className="card text-left p-5 hover:shadow-soft transition"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-900">{f.question}</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition ${open === f.id ? 'rotate-180' : ''}`} />
            </div>
            {open === f.id && <p className="mt-2 text-sm text-slate-600">{f.answer}</p>}
          </button>
        ))}
      </div>
    </section>
  );
}
