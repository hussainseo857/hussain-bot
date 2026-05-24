import { Compass, ShieldCheck, Sparkles, HeartHandshake, Search, Route, MessageCircle, Calendar } from 'lucide-react';

export default function WhyAndHow() {
  return (
    <section id="safety" className="bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="section-title">Why Trip Trekker</h2>
        <p className="section-sub">Built by trekkers for trekkers — safe, beginner-friendly, and adventure-ready.</p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Compass, title: 'Expert Route Guidance', desc: 'Real route briefings, difficulty, altitude, and seasonal advice.' },
            { icon: Sparkles, title: 'Beginner-Friendly Planning', desc: 'Curated easy hikes and family-safe destinations.' },
            { icon: ShieldCheck, title: 'Safety-First Resources', desc: 'Gear checklists, acclimatization & emergency guidance.' },
            { icon: HeartHandshake, title: 'Adventure-Ready Support', desc: '24/7 AI assistant + live human support team.' },
          ].map((f) => (
            <div key={f.title} className="card p-5">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="section-title">How it works</h2>
          <p className="section-sub">From idea to itinerary in 4 simple steps.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Search, title: 'Discover destination' },
              { icon: Route, title: 'Choose route / package' },
              { icon: MessageCircle, title: 'Ask the assistant' },
              { icon: Calendar, title: 'Plan your trip' },
            ].map((s, i) => (
              <div key={s.title} className="card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-mountain-gradient text-white flex items-center justify-center shadow-soft">
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Step {i + 1}</div>
                  <div className="font-medium text-slate-900">{s.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
