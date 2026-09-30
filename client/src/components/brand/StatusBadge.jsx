import React from 'react';

export const StatusBadge = ({ status = 'ACTIVE', size = 'sm' }) => {
  const isSmall = size === 'sm';

  if (status === 'ACTIVE') {
    return (
      <span
        className={`inline-flex items-center space-x-1.5 font-mono uppercase font-semibold rounded-full bg-emerald-950/40 text-emerald-300 border border-emerald-500/20 ${
          isSmall ? 'text-[10px] px-2.5 py-0.5' : 'text-xs px-3 py-1'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>ACTIVE</span>
      </span>
    );
  }

  if (status === 'COMING_SOON') {
    return (
      <span
        className={`inline-flex items-center space-x-1.5 font-mono uppercase font-semibold rounded-full bg-amber-950/40 text-amber-300 border border-amber-500/20 ${
          isSmall ? 'text-[10px] px-2.5 py-0.5' : 'text-xs px-3 py-1'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span>COMING SOON</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center space-x-1.5 font-mono uppercase font-semibold rounded-full bg-zinc-900 text-zinc-400 border border-zinc-700 ${
        isSmall ? 'text-[10px] px-2.5 py-0.5' : 'text-xs px-3 py-1'
      }`}
    >
      <span>ARCHIVED</span>
    </span>
  );
};

export default StatusBadge;
