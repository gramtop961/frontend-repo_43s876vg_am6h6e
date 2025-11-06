import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import CreateLottery from './components/CreateLottery';
import LotteryList from './components/LotteryList';
import TicketManager from './components/TicketManager';
import DrawModal from './components/DrawModal';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function App() {
  const [lotteries, setLotteries] = useState([]);
  const [drawTarget, setDrawTarget] = useState(null);
  const [winnerInfo, setWinnerInfo] = useState(null);

  const handleCreate = (lottery) => {
    setLotteries((prev) => [lottery, ...prev]);
  };

  const handleDelete = (id) => {
    setLotteries((prev) => prev.filter((l) => l.id !== id));
  };

  const handleSellTickets = (id, buyer, quantity) => {
    setLotteries((prev) => prev.map(l => {
      if (l.id !== id) return l;
      const newTickets = Array.from({ length: quantity }, (_, i) => ({ id: crypto.randomUUID(), buyer }));
      return {
        ...l,
        ticketsSold: l.ticketsSold + quantity,
        participants: [...l.participants, ...newTickets],
      };
    }));
  };

  const openDraw = (id) => {
    const l = lotteries.find(x => x.id === id);
    if (l) setDrawTarget(l);
  };

  const confirmDraw = (id) => {
    const l = lotteries.find(x => x.id === id);
    if (!l) return;
    if (l.participants.length === 0) {
      setWinnerInfo({ lotteryName: l.name, message: 'No tickets sold yet.' });
      setDrawTarget(null);
      return;
    }
    const idx = getRandomInt(l.participants.length);
    const winningTicket = l.participants[idx];
    setWinnerInfo({ lotteryName: l.name, buyer: winningTicket.buyer, ticketId: winningTicket.id, prize: l.prize });
    setLotteries((prev) => prev.map(x => x.id === id ? { ...x, status: 'Completed' } : x));
    setDrawTarget(null);
  };

  const stats = useMemo(() => {
    const totalTickets = lotteries.reduce((acc, l) => acc + l.ticketsSold, 0);
    const revenue = lotteries.reduce((acc, l) => acc + l.ticketsSold * l.ticketPrice, 0);
    const open = lotteries.filter(l => l.status !== 'Completed').length;
    const completed = lotteries.length - open;
    return { totalTickets, revenue, open, completed };
  }, [lotteries]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-[#0a0a0a] dark:via-[#0b0b10] dark:to-[#0a0a0f] text-neutral-900 dark:text-white">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/70 dark:bg-white/[0.06] p-4">
            <p className="text-xs text-muted-foreground">Open</p>
            <p className="text-2xl font-semibold">{stats.open}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/70 dark:bg-white/[0.06] p-4">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-2xl font-semibold">{stats.completed}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/70 dark:bg-white/[0.06] p-4">
            <p className="text-xs text-muted-foreground">Tickets Sold</p>
            <p className="text-2xl font-semibold">{stats.totalTickets}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/70 dark:bg-white/[0.06] p-4">
            <p className="text-xs text-muted-foreground">Revenue</p>
            <p className="text-2xl font-semibold">${stats.revenue.toFixed(2)}</p>
          </div>
        </section>

        <CreateLottery onCreate={handleCreate} />
        <TicketManager lotteries={lotteries} onSellTickets={handleSellTickets} />
        <LotteryList lotteries={lotteries} onDelete={handleDelete} onDraw={openDraw} />

        {winnerInfo && (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
            <p className="text-sm">
              {winnerInfo.buyer ? (
                <>
                  Winner for "{winnerInfo.lotteryName}": <span className="font-semibold">{winnerInfo.buyer}</span> (Ticket {winnerInfo.ticketId}). Prize: ${winnerInfo.prize?.toFixed(2)}
                </>
              ) : (
                <>
                  Draw for "{winnerInfo.lotteryName}": {winnerInfo.message}
                </>
              )}
            </p>
          </div>
        )}
      </main>

      <DrawModal open={!!drawTarget} lottery={drawTarget} onClose={() => setDrawTarget(null)} onConfirm={confirmDraw} />
    </div>
  );
}
