import React from 'react';

export default function DrawModal({ open, lottery, onClose, onConfirm }) {
  if (!open || !lottery) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-[min(96vw,560px)] rounded-2xl border border-white/10 bg-white/80 dark:bg-white/[0.08] backdrop-blur p-6 shadow-xl">
        <h3 className="text-lg font-semibold">Draw Winner</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          This will randomly pick a winner from all sold tickets for "{lottery.name}". Continue?
        </p>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md border border-white/20 bg-white/60 dark:bg-white/10">Cancel</button>
          <button onClick={() => onConfirm(lottery.id)} className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500">Confirm Draw</button>
        </div>
      </div>
    </div>
  );
}
