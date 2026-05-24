'use client';
import { Compass, MessageCircle } from 'lucide-react';

export default function Hero({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient -z-10" />
      {/* mountain SVG decoration */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-40 md:h-56 -z-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#10b981" fillOpacity="0.15" d="M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,186.7C840,192,960,192,1080,176C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"/>
        <path fill="#047857" fillOpacity="0.3" d="M0,256L80,229.3C160,203,320,149,480,154.7C640,160,800,224,960,234.7C1120,245,1280,203,1360,181.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"/>
      </svg>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
        <div className="max-w-3xl">
          <span className="badge bg-brand-100 text-brand-800 mb-5">⛰️ Northern Pakistan & Beyond</span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
            Plan your next adventure with{' '}
            <span className="bg-mountain-gradient bg-clip-text text-transparent">Trip Trekker</span>
          </h1>
          <p className="mt-5 text-lg text-slate-700 max-w-2xl">
            Discover destinations, beginner-friendly trekking routes, curated travel packages, and instant
            support from our AI travel assistant — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#destinations" className="btn-primary">
              <Compass className="w-4 h-4" /> Explore Destinations
            </a>
            <button onClick={onOpenChat} className="btn-secondary">
              <MessageCircle className="w-4 h-4" /> Ask Trekker Assistant
            </button>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
            {[
              ['6+', 'Destinations'],
              ['6+', 'Trekking Routes'],
              ['5+', 'Packages'],
            ].map(([n, l]) => (
              <div key={l} className="card p-4 text-center">
                <div className="text-2xl font-bold text-brand-700">{n}</div>
                <div className="text-xs text-slate-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
