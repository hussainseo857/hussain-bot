import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import type { ChatbotSettings } from '@/lib/types';

export default function Contact({ settings }: { settings: ChatbotSettings | null }) {
  return (
    <section id="contact" className="bg-mountain-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Talk to a Trip Trekker expert</h2>
          <p className="mt-3 text-white/80 max-w-xl">
            Have a question our assistant can't answer? Reach our support team during business hours, or
            send an inquiry and we will get back to you within 24 hours.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <InfoCard icon={Mail} label="Email" value={settings?.support_email ?? 'support@triptrekker.example'} />
          <InfoCard icon={Phone} label="Phone" value={settings?.support_phone ?? '+92-300-0000000'} />
          <InfoCard icon={Clock} label="Hours" value={settings?.business_hours ?? 'Mon–Sat, 9:00–19:00 PKT'} />
          <InfoCard icon={MapPin} label="Office" value={settings?.office_location ?? 'Islamabad, Pakistan'} />
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/20">
      <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider">
        <Icon className="w-4 h-4" /> {label}
      </div>
      <div className="mt-2 font-medium">{value}</div>
    </div>
  );
}
