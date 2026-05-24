import { Mountain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-mountain-gradient flex items-center justify-center">
              <Mountain className="w-5 h-5 text-white" />
            </div>
            <div className="font-bold text-white">Trip Trekker</div>
          </div>
          <p className="mt-3 text-sm">Adventure, trekking and travel — done right.</p>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#destinations" className="hover:text-white">Destinations</a></li>
            <li><a href="#routes" className="hover:text-white">Trekking Routes</a></li>
            <li><a href="#packages" className="hover:text-white">Packages</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Support</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#faqs" className="hover:text-white">FAQs</a></li>
            <li><a href="#safety" className="hover:text-white">Safety</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Legal</div>
          <ul className="space-y-2 text-sm">
            <li>Cancellation Policy</li>
            <li>Payment Policy</li>
            <li>© {new Date().getFullYear()} Trip Trekker</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
