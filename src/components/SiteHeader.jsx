import React from 'react';
import { Ticket, Crown, HelpCircle, Gift, LogIn } from 'lucide-react';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:bg-neutral-900/80 border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-sm">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-lg">LottoDash</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
          <a href="#home" className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"><Ticket className="h-4 w-4"/> Juegos</a>
          <a href="#results" className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"><Crown className="h-4 w-4"/> Resultados</a>
          <a href="#promos" className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"><Gift className="h-4 w-4"/> Promociones</a>
          <a href="#help" className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"><HelpCircle className="h-4 w-4"/> Ayuda</a>
        </nav>
        <button className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium shadow-sm hover:opacity-90">
          <LogIn className="h-4 w-4"/> Ingresar
        </button>
      </div>
    </header>
  );
}
