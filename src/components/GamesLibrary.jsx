import React, { useMemo, useState } from 'react';
import { Gamepad2, Sparkles, Box, PlusCircle, Dice5 } from 'lucide-react';

// Simple inline mini-games to make the experience feel playable without a backend
function MiniGame({ template }) {
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const playGuess = () => {
    const g = parseInt(guess || '0', 10);
    if (Number.isNaN(g) || g < 1 || g > 10) {
      setResult({ type: 'error', message: 'Pick a number between 1 and 10.' });
      return;
    }
    const rnd = Math.floor(Math.random() * 10) + 1;
    if (g === rnd) {
      setResult({ type: 'win', message: `Jackpot! Your number ${g} matched ${rnd}.` });
    } else {
      setResult({ type: 'lose', message: `Close! Winning number was ${rnd}.` });
    }
  };

  const playSpin = async () => {
    setSpinning(true);
    setResult(null);
    // Simple fake spin delay
    await new Promise((r) => setTimeout(r, 900));
    const win = Math.random() < 0.3; // 30% chance
    setResult(win ? { type: 'win', message: 'You won this spin! 🎉' } : { type: 'lose', message: 'No luck this time.' });
    setSpinning(false);
  };

  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-white/70 dark:bg-white/[0.06] p-4">
      <p className="text-sm text-muted-foreground">Play a quick demo for {template.name}.</p>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-white/10 p-4">
          <div className="flex items-center gap-2 text-sm font-medium"><Dice5 size={16} /> Number Guess (1-10)</div>
          <div className="mt-2 flex items-center gap-2">
            <input type="number" min="1" max="10" value={guess} onChange={(e) => setGuess(e.target.value)} className="w-24 rounded-md border border-white/20 bg-white/70 dark:bg-white/[0.06] px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500" />
            <button onClick={playGuess} className="px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-500">Try</button>
          </div>
        </div>
        <div className="rounded-lg border border-white/10 p-4">
          <div className="flex items-center gap-2 text-sm font-medium"><Sparkles size={16} /> Spin</div>
          <button onClick={playSpin} disabled={spinning} className="mt-2 px-3 py-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50">{spinning ? 'Spinning…' : 'Spin Wheel'}</button>
        </div>
      </div>
      {result && (
        <div className={`mt-3 rounded-md p-3 text-sm ${result.type === 'win' ? 'bg-emerald-500/10 border border-emerald-500/30' : result.type === 'lose' ? 'bg-rose-500/10 border border-rose-500/30' : 'bg-amber-500/10 border border-amber-500/30'}` }>
          {result.message}
        </div>
      )}
    </div>
  );
}

export default function GamesLibrary({ onImport }) {
  const [openDemoFor, setOpenDemoFor] = useState(null);
  const templates = useMemo(() => ([
    {
      key: 'power-draw',
      name: 'Power Draw',
      description: 'Pick 5 numbers + power ball. Big prize, weekly draw.',
      ticketPrice: 2,
      prize: 5000000,
      suggestedDaysUntilDraw: 7,
    },
    {
      key: 'mega-match',
      name: 'Mega Match',
      description: 'Choose 6 numbers. Twice-weekly drawing.',
      ticketPrice: 3,
      prize: 2000000,
      suggestedDaysUntilDraw: 3,
    },
    {
      key: 'fifty-fifty',
      name: '50/50 Raffle',
      description: 'Half of the pot to the winner. Great for events.',
      ticketPrice: 5,
      prize: 0, // Pot grows with sales
      suggestedDaysUntilDraw: 1,
    },
    {
      key: 'scratch-bonus',
      name: 'Scratch Bonus',
      description: 'Instant win style. Small price, frequent wins.',
      ticketPrice: 1,
      prize: 500,
      suggestedDaysUntilDraw: 0,
    },
  ]), []);

  const importTemplate = (t) => {
    const drawDate = new Date();
    drawDate.setDate(drawDate.getDate() + (t.suggestedDaysUntilDraw || 0));
    const lottery = {
      id: crypto.randomUUID(),
      name: t.name,
      ticketPrice: t.ticketPrice,
      prize: t.prize,
      drawDate: drawDate.toISOString().slice(0, 10),
      status: 'Open',
      ticketsSold: 0,
      participants: [],
      createdAt: new Date().toISOString(),
      templateKey: t.key,
    };
    onImport(lottery);
  };

  return (
    <section className="bg-white/70 dark:bg-white/[0.06] rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-indigo-600 text-white"><Gamepad2 size={16} /></div>
          <h2 className="text-lg font-semibold">Games Library</h2>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((t) => (
          <div key={t.key} className="rounded-xl border border-white/10 bg-white/70 dark:bg-white/[0.06] p-4 flex flex-col">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-medium">{t.name}</div>
                <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
              </div>
              <Box size={18} className="text-muted-foreground" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-md border border-white/10 p-2">Ticket ${t.ticketPrice.toFixed(2)}</div>
              <div className="rounded-md border border-white/10 p-2">Prize {t.prize ? `$${t.prize.toLocaleString()}` : 'Grows'}</div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button onClick={() => importTemplate(t)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-500"><PlusCircle size={16} /> Import</button>
              <button onClick={() => setOpenDemoFor((cur) => cur === t.key ? null : t.key)} className="px-3 py-1.5 rounded-md border border-white/20 bg-white/60 dark:bg-white/10">Play</button>
            </div>
            {openDemoFor === t.key && <MiniGame template={t} />}
          </div>
        ))}
      </div>
    </section>
  );
}
