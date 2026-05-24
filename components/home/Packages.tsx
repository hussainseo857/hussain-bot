import { Tag, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import type { TravelPackage } from '@/lib/types';

const FALLBACK: TravelPackage[] = [
  { id: '1', package_name: '3-Day Hunza Explorer', destination: 'Hunza Valley', duration: '3D/2N', price_range: 'PKR 35k–45k', included_services: 'Transport, hotel, breakfast, guided tour', excluded_services: null, cancellation_policy: null, payment_policy: null, is_active: true },
  { id: '2', package_name: '5-Day Skardu Adventure', destination: 'Skardu', duration: '5D/4N', price_range: 'PKR 65k–85k', included_services: 'Flights, hotel, Deosai trip, guide', excluded_services: null, cancellation_policy: null, payment_policy: null, is_active: true },
  { id: '3', package_name: 'Fairy Meadows Trek', destination: 'Fairy Meadows', duration: '4D/3N', price_range: 'PKR 45k–60k', included_services: 'Jeep ride, porter, hut stay, meals', excluded_services: null, cancellation_policy: null, payment_policy: null, is_active: true },
  { id: '4', package_name: 'Naran Kaghan Family Tour', destination: 'Naran Kaghan', duration: '4D/3N', price_range: 'PKR 28k–38k', included_services: 'Hotel, breakfast, Saif-ul-Malook trip', excluded_services: null, cancellation_policy: null, payment_policy: null, is_active: true },
  { id: '5', package_name: 'Swat Valley Scenic Tour', destination: 'Swat Valley', duration: '4D/3N', price_range: 'PKR 30k–42k', included_services: 'Hotel, Malam Jabba chairlift, Mahodand jeep', excluded_services: null, cancellation_policy: null, payment_policy: null, is_active: true },
];

export default function Packages({ data }: { data?: TravelPackage[] }) {
  const list = (data && data.length ? data : FALLBACK).slice(0, 5);
  return (
    <section id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-10">
        <h2 className="section-title">Travel Packages</h2>
        <p className="section-sub">Curated, fully-supported trips with transport, stay, and a certified guide.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((p) => (
          <article key={p.id} className="card p-5 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">{p.package_name}</h3>
              <span className="badge bg-amber-50 text-amber-700"><Tag className="w-3 h-3" /> {p.price_range}</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brand-600" /> {p.destination}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-600" /> {p.duration}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600 flex gap-2"><CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" /> {p.included_services}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
