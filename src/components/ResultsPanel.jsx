import React from 'react';
import { Trophy, Clock } from 'lucide-react';

export default function ResultsPanel({ lastWinner }) {
  return (
    <section id="results" className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Resultados y ganadores</h2>
          <div className="text-sm text-neutral-600 dark:text-neutral-300 flex items-center gap-2">
            <Clock className="h-4 w-4"/> Actualizado en tiempo real
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Trophy className="h-5 w-5"/>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">Último ganador</p>
                {lastWinner ? (
                  <p className="text-lg font-semibold">{lastWinner.name} ganó ${lastWinner.amount.toLocaleString()} en {lastWinner.game}</p>
                ) : (
                  <p className="text-lg font-semibold">Aún no hay ganadores</p>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">Próximos sorteos</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-center justify-between"><span>Power Draw</span><span>Hoy 9:00 PM</span></li>
              <li className="flex items-center justify-between"><span>Mega Match</span><span>Mañana 8:30 PM</span></li>
              <li className="flex items-center justify-between"><span>50/50 Rifa</span><span>Sábado 7:00 PM</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
