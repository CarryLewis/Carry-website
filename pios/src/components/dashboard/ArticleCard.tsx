'use client';

import { Article } from '@/lib/types';
import { Bookmark, Clock, ArrowUpRight, Sparkles } from 'lucide-react';

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 90 ? 'text-danger bg-danger/10' :
    score >= 75 ? 'text-warning bg-warning/10' :
    'text-accent bg-accent-soft';
  return (
    <span className={`text-xs font-mono px-2 py-0.5 rounded ${color}`}>
      {score}
    </span>
  );
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="group p-5 rounded-xl border border-border bg-card hover:bg-card-hover transition-all">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="font-mono uppercase tracking-wider">{article.source}</span>
          <span>·</span>
          <span>{article.category}</span>
        </div>
        <div className="flex items-center gap-2">
          <ScoreBadge score={article.importanceScore} />
          <button className="text-muted hover:text-accent transition-colors">
            <Bookmark className={`w-4 h-4 ${article.isSaved ? 'fill-accent text-accent' : ''}`} />
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-[15px] leading-snug mb-2 group-hover:text-accent transition-colors cursor-pointer">
        {article.title}
      </h3>

      <p className="text-sm text-muted leading-relaxed mb-3">{article.summary}</p>

      <div className="bg-accent-soft rounded-lg p-3 mb-3 space-y-1.5">
        <div className="flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
          <p className="text-xs text-accent leading-relaxed">{article.relevanceReason}</p>
        </div>
        <div className="flex items-start gap-2">
          <ArrowUpRight className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
          <p className="text-xs text-accent/80 leading-relaxed">{article.recommendedAction}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime} min
          </span>
          {article.isRead && (
            <span className="text-success">Read</span>
          )}
        </div>
        <div className="flex gap-1.5">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded bg-card border border-border text-[11px]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
