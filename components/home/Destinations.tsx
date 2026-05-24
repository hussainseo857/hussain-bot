import { MapPin, Sun, Mountain } from 'lucide-react';
import type { Destination } from '@/lib/types';

const FALLBACK: Destination[] = [
  { id: '1', name: 'Hunza Valley', country: 'Pakistan', region: 'Gilgit-Baltistan', description: 'Scenic valley with forts and Rakaposhi views.', best_season: 'May–October', difficulty_level: 'Easy to Moderate', estimated_budget: 'PKR 35k–85k', highlights: 'Baltit Fort, Attabad Lake', safety_notes: null, is_active: true },
  { id: '2', name: 'Skardu', country: 'Pakistan', region: 'Gilgit-Baltistan', description: 'Gateway to K2 with lakes and cold deserts.', best_season: 'May–September', difficulty_level: 'Moderate', estimated_budget: 'PKR 50k–120k', highlights: 'Shangrila, Deosai, Shigar', safety_notes: null, is_active: true },
  { id: '3', name: 'Fairy Meadows', country: 'Pakistan', region: 'Gilgit-Baltistan', description: 'Alpine meadow facing Nanga Parbat.', best_season: 'June–August', difficulty_level: 'Moderate–Challenging', estimated_budget: 'PKR 40k–90k', highlights: 'Nanga Parbat view, Beyal Camp', safety_notes: null, is_active: true },
  { id: '4', name: 'Naran Kaghan', country: 'Pakistan', region: 'KPK', description: 'Lakes, rivers and meadows ideal for first trips.', best_season: 'May–September', difficulty_level: 'Easy', estimated_budget: 'PKR 25k–60k', highlights: 'Saif-ul-Malook, Babusar Top', safety_notes: null, is_active: true },
  { id: '5', name: 'Swat Valley', country: 'Pakistan', region: 'KPK', description: 'Switzerland of the East — green valleys and rivers.', best_season: 'March–October', difficulty_level: 'Easy', estimated_budget: 'PKR 25k–55k', highlights: 'Malam Jabba, Mahodand', safety_notes: null, is_active: true },
  { id: '6', name: 'Murree & Galiyat', country: 'Pakistan', region: 'Punjab/KPK', description: 'Pine-covered hill stations for weekend trips.', best_season: 'Mar–Oct / Dec–Feb', difficulty_level: 'Easy', estimated_budget: 'PKR 12k–35k', highlights: 'Nathia Gali, Patriata', safety_notes: null, is_active: true },
];

export default function Destinations({ data }: { data?: Destination[] }) {
  const list = (data && data.length ? data : FALLBACK).slice(0, 6);
  return (
    <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-10">
        <h2 className="section-title">Featured Destinations</h2>
        <p className="section-sub">Handpicked places loved by trekkers, families, and solo adventurers.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((d, i) => (
          <article key={d.id} className="card p-5 hover:shadow-soft transition group">
            <div className={`h-32 rounded-xl mb-4 bg-gradient-to-br ${gradientFor(i)} relative overflow-hidden`}>
              <Mountain className="absolute -bottom-2 -right-2 w-24 h-24 text-white/20" />
              <div className="absolute top-3 left-3 badge bg-white/90 text-brand-800">
                <MapPin className="w-3 h-3" /> {d.region ?? d.country}
              </div>
            </div>
            <h3 className="font-semibold text-slate-900 group-hover:text-brand-700">{d.name}</h3>
            <p className="mt-1 text-sm text-slate-600 line-clamp-2">{d.description}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="badge bg-brand-50 text-brand-700"><Sun className="w-3 h-3" /> {d.best_season}</span>
              <span className="badge bg-amber-50 text-amber-700">⛰ {d.difficulty_level}</span>
              <span className="badge bg-sky-50 text-sky-700">💰 {d.estimated_budget}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function gradientFor(i: number) {
  const gradients = [
    'from-emerald-500 to-teal-600',
    'from-sky-500 to-indigo-600',
    'from-amber-400 to-orange-600',
    'from-rose-400 to-pink-600',
    'from-violet-500 to-purple-700',
    'from-lime-500 to-green-700',
  ];
  return gradients[i % gradients.length];
}
