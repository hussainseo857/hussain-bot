'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import Destinations from '@/components/home/Destinations';
import Routes from '@/components/home/Routes';
import Packages from '@/components/home/Packages';
import WhyAndHow from '@/components/home/WhyAndHow';
import FAQs from '@/components/home/FAQs';
import Contact from '@/components/home/Contact';
import Footer from '@/components/home/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import type {
  ChatbotSettings,
  Destination,
  TrekkingRoute,
  TravelPackage,
  FAQ,
} from '@/lib/types';

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [settings, setSettings] = useState<ChatbotSettings | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [routes, setRoutes] = useState<TrekkingRoute[]>([]);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    const sb = createSupabaseBrowserClient();
    (async () => {
      const [s, d, r, p, f] = await Promise.all([
        sb.from('chatbot_settings').select('*').limit(1).maybeSingle(),
        sb.from('destinations').select('*').eq('is_active', true).limit(6),
        sb.from('trekking_routes').select('*').eq('is_active', true).limit(6),
        sb.from('travel_packages').select('*').eq('is_active', true).limit(6),
        sb.from('faqs').select('*').eq('is_active', true).limit(5),
      ]);
      if (s.data) setSettings(s.data as ChatbotSettings);
      if (d.data) setDestinations(d.data as Destination[]);
      if (r.data) setRoutes(r.data as TrekkingRoute[]);
      if (p.data) setPackages(p.data as TravelPackage[]);
      if (f.data) setFaqs(f.data as FAQ[]);
    })();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero onOpenChat={() => setChatOpen(true)} />
        <Destinations data={destinations} />
        <Routes data={routes} />
        <Packages data={packages} />
        <WhyAndHow />
        <FAQs data={faqs} />
        <Contact settings={settings} />
      </main>
      <Footer />
      <ChatWidget open={chatOpen} setOpen={setChatOpen} />
    </>
  );
}
