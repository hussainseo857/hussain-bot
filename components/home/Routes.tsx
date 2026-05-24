import { TrendingUp, Clock, Sun, ShieldAlert } from 'lucide-react';
import type { TrekkingRoute } from '@/lib/types';

const FALLBACK: TrekkingRoute[] = [
  { id: '1', route_name: 'Fairy Meadows → Nanga Parbat BC', destination: 'Fairy Meadows', duration: '2 days', difficulty_level: 'Challenging', altitude: '~4200m', route_summary: 'Hike through Beyal Camp to base-camp viewpoint.', required_gear: null, safety_notes: 'Go with a guide. Acclimatize.', best_season: 'Jun–Aug', is_active: true },
  { id: '2', route_name: 'Rakaposhi Base Camp', destination: 'Hunza', duration: '3 days', difficulty_level: 'Challenging', altitude: '~3500m', route_summary: 'Minapin to Tagaphari meadows.', required_gear: null, safety_notes: 'Stream crossings tricky in afternoon.', best_season: 'Jun–Sep', is_active: true },
  { id: '3', route_name: 'Margalla Hills Trail 5', destination: 'Islamabad', duration: '3–4 hrs', difficulty_level: 'Easy', altitude: '~1100m', route_summary: 'Forest climb to panoramic viewpoint.', required_gear: null, safety_notes: 'Carry water.', best_season: 'Oct–Apr', is_active: true },
  { id: '4', route_name: 'Deosai Plains Day Hike', destination: 'Skardu', duration: '1 day', difficulty_level: 'Easy–Moderate', altitude: '~4100m', route_summary: 'Plateau hike around Sheosar Lake.', required_gear: null, safety_notes: 'Weather changes fast.', best_season: 'Jul–Sep', is_active: true },
  { id: '5', route_name: 'Mushkpuri Top', destination: 'Nathia Gali', duration: '3–4 hrs', difficulty_level: 'Easy–Moderate', altitude: '~2800m', route_summary: 'Pine-forest trek with Kashmir views.', required_gear: null, safety_notes: 'Slippery after rain.', best_season: 'Apr–Oct', is_active: true },
  { id: '6', route_name: 'Miranjani Trek', destination: 'Ayubia', duration: '4–5 hrs', difficulty_level: 'Moderate', altitude: '~2992m', route_summary: 'Highest peak in the Galiyat range.', required_gear: null, safety_notes: 'Carry rain jacket.', best_season: 'Apr–Oct', is_active: true },
];

export default function Routes({ data }: { data?: TrekkingRoute[] }) {
  const list = (data && data.length ? data : FALLBACK).slice(0, 6);
  return (
    <section id="routes" className="bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10">
          <h2 className="section-title">Trekking Routes</h2>
          <p className="section-sub">From easy day hikes to high-altitude adventures — pick a route that matches your level.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((r) => (
            <article key={r.id} className="card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{r.route_name}</h3>
                <span className="badge bg-brand-50 text-brand-700">{r.altitude}</span>
              </div>
              <p className="mt-1 text-sm text-slate-600 line-clamp-2">{r.route_summary}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-600" /> {r.duration}</div>
                <div className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-amber-600" /> {r.difficulty_level}</div>
                <div className="flex items-center gap-1 col-span-2"><Sun className="w-3.5 h-3.5 text-sky-600" /> Best season: {r.best_season}</div>
              </div>
              {r.safety_notes && (
                <div className="mt-3 text-xs text-rose-700 bg-rose-50 px-2 py-1.5 rounded-lg flex gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 mt-0.5" /> {r.safety_notes}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
