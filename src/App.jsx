import React, { useMemo, useState } from 'react';
import SiteHeader from './components/SiteHeader';
import Hero from './components/Hero';
import GamesShowcase from './components/GamesShowcase';
import ResultsPanel from './components/ResultsPanel';
import PromoBanner from './components/PromoBanner';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function App() {
  const [lotteries, setLotteries] = useState([]);
  const [winnerInfo, setWinnerInfo] = useState(null);

  const handleSelectGame = (game) => {
    const newLottery = {
      id: crypto.randomUUID(),
      name: game.name,
      ticketPrice: game.price,
      prize: typeof game.prize === 'number' ? game.prize : 10000,
      drawDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      status: 'Open',
      ticketsSold: 0,
      participants: [],
    };
    setLotteries((prev) => [newLottery, ...prev]);
  };

  const handleSellTickets = (id, buyer, quantity) => {
    setLotteries((prev) => prev.map(l => {
      if (l.id !== id) return l;
      const newTickets = Array.from({ length: quantity }, () => ({ id: crypto.randomUUID(), buyer }));
      return { ...l, ticketsSold: l.ticketsSold + quantity, participants: [...l.participants, ...newTickets] };
    }));
  };

  const confirmDraw = (id) => {
    const l = lotteries.find(x => x.id === id);
    if (!l) return;
    if (l.participants.length === 0) {
      setWinnerInfo({ name: null, amount: 0, game: l.name, message: 'No hay boletos vendidos.' });
      return;
    }
    const idx = getRandomInt(l.participants.length);
    const winningTicket = l.participants[idx];
    setWinnerInfo({ name: winningTicket.buyer, amount: l.prize, game: l.name });
    setLotteries((prev) => prev.map(x => x.id === id ? { ...x, status: 'Completed' } : x));
  };

  const stats = useMemo(() => {
    const totalTickets = lotteries.reduce((acc, l) => acc + l.ticketsSold, 0);
    const revenue = lotteries.reduce((acc, l) => acc + l.ticketsSold * l.ticketPrice, 0);
    const open = lotteries.filter(l => l.status !== 'Completed').length;
    const completed = lotteries.length - open;
    return { totalTickets, revenue, open, completed };
  }, [lotteries]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <SiteHeader />
      <Hero />
      <GamesShowcase onSelect={handleSelectGame} />
      <PromoBanner />
      <ResultsPanel lastWinner={winnerInfo} />

      <main className="max-w-7xl mx-auto px-4 pb-16">
        {lotteries.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Tus sorteos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lotteries.map(l => (
                <div key={l.id} className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{l.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">{l.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Precio: ${l.ticketPrice} • Premio: ${typeof l.prize === 'number' ? l.prize.toLocaleString() : l.prize}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">Fecha de sorteo: {new Date(l.drawDate).toLocaleString()}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span>Boletos vendidos: {l.ticketsSold}</span>
                    <button onClick={() => confirmDraw(l.id)} className="px-3 py-1.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-semibold">Sortear</button>
                  </div>
                  <form className="mt-3 flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); const name = fd.get('buyer'); const qty = Number(fd.get('qty') || 1); if (name) handleSellTickets(l.id, String(name), qty); e.currentTarget.reset(); }}>
                    <input name="buyer" placeholder="Nombre" className="flex-1 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent" />
                    <input name="qty" type="number" min="1" defaultValue="1" className="w-20 px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-transparent" />
                    <button className="px-3 py-2 rounded-lg bg-amber-600 text-white font-semibold">Comprar</button>
                  </form>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
            <p className="text-xs text-neutral-600 dark:text-neutral-300">Abiertos</p>
            <p className="text-2xl font-semibold">{stats.open}</p>
          </div>
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
            <p className="text-xs text-neutral-600 dark:text-neutral-300">Completados</p>
            <p className="text-2xl font-semibold">{stats.completed}</p>
          </div>
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
            <p className="text-xs text-neutral-600 dark:text-neutral-300">Boletos vendidos</p>
            <p className="text-2xl font-semibold">{stats.totalTickets}</p>
          </div>
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4">
            <p className="text-xs text-neutral-600 dark:text-neutral-300">Ingresos</p>
            <p className="text-2xl font-semibold">${stats.revenue.toFixed(2)}</p>
          </div>
        </section>
      </main>

      <footer id="help" className="border-t border-black/5 dark:border-white/10 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-sm text-neutral-600 dark:text-neutral-300">
          <p>© {new Date().getFullYear()} LottoDash — Todos los derechos reservados.</p>
          <p className="mt-2">Este es un sitio de demostración inspirado en loterías en línea para fines educativos.</p>
        </div>
      </footer>
    </div>
  );
}
