'use client';

import Link from 'next/link';
import { Article } from '@/lib/types';
import { Bookmark, Clock, ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import ScoreBadge from '@/components/ui/ScoreBadge';
import SourceBadge from '@/components/ui/SourceBadge';
import { relativeTime, cn } from '@/lib/utils';

export function ArticleCardCompact({ article }: { article: Article }) {
  return (
    <Link
      href={`/dashboard/article/${article.id}`}
      className="group flex items-center gap-4 px-4 py-3 rounded-lg border border-border bg-card hover:bg-card-hover transition-all"
    >
      <ScoreBadge score={article.importanceScore} />
      <div className="flex-1 min-w-0">
        <h3 className={cn(
          'text-[13px] font-medium truncate group-hover:text-accent transition-colors',
          article.isRead && 'text-muted'
        )}>
          {article.title}
        </h3>
        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-muted">
          <span>{article.source}</span>
          <span className="text-border">·</span>
          <span>{article.category}</span>
          <span className="text-border">·</span>
          <span>{relativeTime(article.publishedAt)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="flex items-center gap-1 text-[11px] text-muted">
          <Clock className="w-3 h-3" />
          {article.readTime}m
        </span>
        <Bookmark className={cn('w-3.5 h-3.5', article.isSaved ? 'fill-accent text-accent' : 'text-muted/40')} />
      </div>
    </Link>
  );
}

export default function ArticleCard({ article, variant = 'default' }: { article: Article; variant?: 'default' | 'brief' }) {
  const isBrief = variant === 'brief';

  return (
    <div className={cn(
      'group rounded-xl border border-border bg-card hover:bg-card-hover transition-all',
      isBrief ? 'p-4' : 'p-5',
    )}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <SourceBadge type={article.sourceType} />
          <span className="text-[11px] text-muted">{article.source}</span>
          <span className="text-[11px] text-border">·</span>
          <span className="text-[11px] text-muted">{relativeTime(article.publishedAt)}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ScoreBadge score={article.importanceScore} />
          <button className="text-muted hover:text-accent transition-colors p-0.5">
            <Bookmark className={cn('w-4 h-4', article.isSaved ? 'fill-accent text-accent' : '')} />
          </button>
        </div>
      </div>

      {/* Title */}
      <Link href={`/dashboard/article/${article.id}`}>
        <h3 className={cn(
          'font-semibold leading-snug mb-2 group-hover:text-accent transition-colors cursor-pointer',
          isBrief ? 'text-[14px]' : 'text-[15px]',
          article.isRead && 'text-muted',
        )}>
          {article.title}
          {article.isRead && <span className="ml-2 text-[10px] font-normal text-success/70">read</span>}
        </h3>
      </Link>

      {/* Summary */}
      <p className={cn('text-muted leading-relaxed mb-3', isBrief ? 'text-[12px]' : 'text-sm')}>
        {article.summary}
      </p>

      {/* AI Insight Box */}
      <div className="rounded-lg border border-accent/15 bg-accent/[0.04] p-3 mb-3 space-y-2">
        <div className="flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-accent/60 uppercase tracking-wider">Why this matters</span>
            <p className="text-[12px] text-accent/90 leading-relaxed mt-0.5">{article.relevanceReason}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <ArrowUpRight className="w-3.5 h-3.5 text-accent/70 mt-0.5 shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-accent/60 uppercase tracking-wider">Recommended action</span>
            <p className="text-[12px] text-accent/70 leading-relaxed mt-0.5">{article.recommendedAction}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[11px] text-muted">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime} min read
          </span>
          <span className="text-border">·</span>
          <span>{article.category}</span>
        </div>
        <div className="flex gap-1.5">
          {article.tags.slice(0, isBrief ? 2 : 3).map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
