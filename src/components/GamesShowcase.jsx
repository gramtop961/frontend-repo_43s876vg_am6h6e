import React from 'react';
import { TicketPercent, Dice5, CalendarDays, DollarSign } from 'lucide-react';

const games = [
  { key: 'power-draw', name: 'Power Draw', price: 5, prize: 100000, schedule: 'Diario 9:00 PM' },
  { key: 'mega-match', name: 'Mega Match', price: 3, prize: 50000, schedule: 'Lun, Mié, Vie' },
  { key: 'fifty-fifty', name: '50/50 Rifa', price: 2, prize: 'Pozo acumulado', schedule: 'Sábados' },
  { key: 'scratch-bonus', name: 'Scratch Bonus', price: 1, prize: 'Instantáneo', schedule: 'Todo el día' },
];

export default function GamesShowcase({ onSelect }) {
  return (
    <section id="games" className="py-12 bg-gradient-to-b from-transparent to-neutral-50 dark:to-neutral-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Juegos disponibles</h2>
            <p className="text-neutral-600 dark:text-neutral-300">Elige tu juego favorito y compra tus boletos al instante.</p>
          </div>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {games.map(g => (
            <button key={g.key} onClick={() => onSelect?.(g)} className="group text-left rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Dice5 className="h-5 w-5" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-white/10">{g.schedule}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold">{g.name}</h3>
              <div className="mt-2 flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                <div className="flex items-center gap-1"><DollarSign className="h-4 w-4"/> {g.price}</div>
                <div className="flex items-center gap-1"><TicketPercent className="h-4 w-4"/> {typeof g.prize === 'number' ? `$${g.prize.toLocaleString()}` : g.prize}</div>
                <div className="flex items-center gap-1"><CalendarDays className="h-4 w-4"/> {g.schedule}</div>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-amber-700 group-hover:translate-x-0.5 transition-transform font-medium">Comprar ahora →</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
