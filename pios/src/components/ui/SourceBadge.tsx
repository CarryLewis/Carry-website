'use client';

import { cn } from '@/lib/utils';
import { Rss, Mail, BookOpen, AtSign, GraduationCap, FlaskConical, Globe, Plug } from 'lucide-react';

const sourceConfig: Record<string, { icon: typeof Rss; color: string }> = {
  rss: { icon: Rss, color: 'text-orange-400 bg-orange-400/10' },
  newsletter: { icon: Mail, color: 'text-violet-400 bg-violet-400/10' },
  substack: { icon: BookOpen, color: 'text-orange-500 bg-orange-500/10' },
  twitter: { icon: AtSign, color: 'text-sky-400 bg-sky-400/10' },
  pubmed: { icon: GraduationCap, color: 'text-emerald-400 bg-emerald-400/10' },
  arxiv: { icon: FlaskConical, color: 'text-red-400 bg-red-400/10' },
  blog: { icon: Globe, color: 'text-blue-400 bg-blue-400/10' },
  custom: { icon: Plug, color: 'text-zinc-400 bg-zinc-400/10' },
};

export default function SourceBadge({ type, className }: { type: string; className?: string }) {
  const config = sourceConfig[type] || sourceConfig.custom;
  const Icon = config.icon;
  return (
    <span className={cn(`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${config.color}`, className)}>
      <Icon className="w-3 h-3" />
      {type}
    </span>
  );
}
