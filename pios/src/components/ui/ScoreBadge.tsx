'use client';

import { cn, scoreColor } from '@/lib/utils';

export default function ScoreBadge({ score, className }: { score: number; className?: string }) {
  return (
    <span className={cn(`inline-flex items-center gap-1 text-[11px] font-mono tabular-nums px-2 py-0.5 rounded border ${scoreColor(score)}`, className)}>
      {score}
    </span>
  );
}
