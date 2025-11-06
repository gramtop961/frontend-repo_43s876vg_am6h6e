import React, { useState } from 'react';

export default function CreateLottery({ onCreate }) {
  const [name, setName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('5');
  const [drawDate, setDrawDate] = useState('');
  const [prize, setPrize] = useState('500');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !drawDate) return;
    const lottery = {
      id: crypto.randomUUID(),
      name,
      ticketPrice: parseFloat(ticketPrice || '0'),
      prize: parseFloat(prize || '0'),
      drawDate,
      status: 'Open',
      ticketsSold: 0,
      participants: [],
      createdAt: new Date().toISOString(),
    };
    onCreate(lottery);
    setName('');
    setTicketPrice('5');
    setPrize('500');
    setDrawDate('');
  };

  return (
    <section id="create" className="bg-white/70 dark:bg-white/[0.06] rounded-2xl border border-white/10 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Create a New Lottery</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Lottery name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Weekend Bonanza"
            className="w-full rounded-md border border-white/20 bg-white/70 dark:bg-white/[0.06] px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Ticket price ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
            className="w-full rounded-md border border-white/20 bg-white/70 dark:bg-white/[0.06] px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Top prize ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={prize}
            onChange={(e) => setPrize(e.target.value)}
            className="w-full rounded-md border border-white/20 bg-white/70 dark:bg-white/[0.06] px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Draw date</label>
          <input
            type="date"
            value={drawDate}
            onChange={(e) => setDrawDate(e.target.value)}
            className="w-full rounded-md border border-white/20 bg-white/70 dark:bg-white/[0.06] px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="md:col-span-4 flex justify-end">
          <button type="submit" className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition">
            Create Lottery
          </button>
        </div>
      </form>
    </section>
  );
}
