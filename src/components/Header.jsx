import React from 'react';
import { Ticket, Settings, Star } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur border-b border-white/10 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-600/30">
            <Ticket size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Lotto Manager</h1>
            <p className="text-xs text-muted-foreground">Simple lottery management dashboard</p>
          </div>
        </div>
        <nav className="flex items-center gap-3 text-sm">
          <a href="#create" className="px-3 py-2 rounded-md hover:bg-white/50 dark:hover:bg-white/10 transition">Create</a>
          <a href="#lotteries" className="px-3 py-2 rounded-md hover:bg-white/50 dark:hover:bg-white/10 transition">Lotteries</a>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition">
            <Star size={16} />
            Upgrade
          </button>
          <button className="ml-1 p-2 rounded-md hover:bg-white/50 dark:hover:bg-white/10 transition" aria-label="Settings">
            <Settings size={18} />
          </button>
        </nav>
      </div>
    </header>
  );
}
