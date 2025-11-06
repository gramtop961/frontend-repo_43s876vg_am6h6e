import React from 'react';
import { Calendar, Users, DollarSign, Trophy, Trash2, PlayCircle } from 'lucide-react';

export default function LotteryList({ lotteries, onDelete, onDraw }) {
  if (lotteries.length === 0) {
    return (
      <section id="lotteries" className="text-center py-16 border border-dashed border-white/20 rounded-2xl">
        <p className="text-muted-foreground">No lotteries yet. Create your first one above.</p>
      </section>
    );
  }

  return (
    <section id="lotteries" className="space-y-4">
      {lotteries.map((lottery) => (
        <div key={lottery.id} className="bg-white/70 dark:bg-white/[0.06] rounded-2xl border border-white/10 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{lottery.name}</h3>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><DollarSign size={16} /> Ticket: ${lottery.ticketPrice.toFixed(2)}</div>
              <div className="flex items-center gap-2"><Trophy size={16} /> Prize: ${lottery.prize.toFixed(2)}</div>
              <div className="flex items-center gap-2"><Calendar size={16} /> Draw: {new Date(lottery.drawDate).toLocaleDateString()}</div>
              <div className="flex items-center gap-2"><Users size={16} /> Sold: {lottery.ticketsSold}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => onDraw(lottery.id)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition">
              <PlayCircle size={16} /> Draw
            </button>
            <button onClick={() => onDelete(lottery.id)} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-500 transition">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
