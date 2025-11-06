import React from 'react';
import { Gift, ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section id="promos" className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Gift className="h-5 w-5"/>
            </div>
            <div>
              <p className="text-sm opacity-90">Promoción semanal</p>
              <h3 className="text-xl font-semibold">Doble oportunidad en tu primer boleto</h3>
            </div>
          </div>
          <a href="#games" className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-white text-neutral-900 px-4 py-2 rounded-xl font-semibold hover:opacity-90">
            Aprovechar ahora <ArrowRight className="h-4 w-4"/>
          </a>
        </div>
      </div>
    </section>
  );
}
