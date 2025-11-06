import React from 'react';
import { Star, ShieldCheck, Sparkles } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[60vh] md:min-h-[70vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Wn5uO2c9y8mX0m8x/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-white/10 px-3 py-1 text-xs backdrop-blur border border-black/5 dark:border-white/10">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            ¡Nueva experiencia de sorteos en línea!
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Juega tus sorteos favoritos con una interfaz moderna y segura
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-prose">
            Compra boletos, revisa resultados al instante y participa en promociones especiales. Todo en un solo lugar.
          </p>
          <div className="flex items-center gap-3">
            <a href="#games" className="px-5 py-3 rounded-xl bg-amber-600 text-white font-semibold shadow hover:brightness-110">Comprar boletos</a>
            <a href="#results" className="px-5 py-3 rounded-xl bg-white dark:bg-white/10 border border-black/5 dark:border-white/10 font-semibold hover:bg-white/80">Ver resultados</a>
          </div>
          <div className="flex items-center gap-6 pt-2 text-sm text-neutral-600 dark:text-neutral-300">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600"/> Pagos seguros</div>
            <div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500"/> Premios garantizados</div>
          </div>
        </div>
        <div className="hidden md:block" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent" />
    </section>
  );
}
