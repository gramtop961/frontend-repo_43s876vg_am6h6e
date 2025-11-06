import React, { useMemo, useState } from 'react';
import { Plus, Minus, User2 } from 'lucide-react';

export default function TicketManager({ lotteries, onSellTickets }) {
  const [selectedId, setSelectedId] = useState('');
  const [buyer, setBuyer] = useState('');
  const [quantity, setQuantity] = useState(1);

  const options = useMemo(() => {
    return lotteries.map(l => ({ value: l.id, label: `${l.name} • $${l.ticketPrice.toFixed(2)}` }));
  }, [lotteries]);

  const selected = lotteries.find(l => l.id === selectedId);

  const sell = () => {
    if (!selectedId || !buyer || quantity <= 0) return;
    onSellTickets(selectedId, buyer, quantity);
    setBuyer('');
    setQuantity(1);
  };

  return (
    <section className="bg-white/70 dark:bg-white/[0.06] rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Sell Tickets</h2>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm text-muted-foreground">Select lottery</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full rounded-md border border-white/20 bg-white/70 dark:bg-white/[0.06] px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Choose...</option>
            {options.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Buyer name</label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <User2 className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
                placeholder="Customer name"
                className="w-full rounded-md border border-white/20 bg-white/70 dark:bg-white/[0.06] pl-8 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Quantity</label>
          <div className="flex items-center gap-2">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 rounded-md bg-white/60 dark:bg-white/10 border border-white/20"><Minus size={16} /></button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value || '1', 10)))}
              className="w-20 text-center rounded-md border border-white/20 bg-white/70 dark:bg-white/[0.06] px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button onClick={() => setQuantity(q => q + 1)} className="p-2 rounded-md bg-white/60 dark:bg-white/10 border border-white/20"><Plus size={16} /></button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {selected ? `Total: $${(selected.ticketPrice * quantity).toFixed(2)}` : 'Select a lottery to see total'}
        </p>
        <button onClick={sell} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition">
          Sell Tickets
        </button>
      </div>
    </section>
  );
}
