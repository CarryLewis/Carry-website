'use client';

import { use } from 'react';
import { mockArticles } from '@/lib/mock-data';
import { relativeTime } from '@/lib/utils';
import ScoreBadge from '@/components/ui/ScoreBadge';
import SourceBadge from '@/components/ui/SourceBadge';
import Link from 'next/link';
import {
  ArrowLeft, Bookmark, Clock, Sparkles, ArrowUpRight,
  Share2, ExternalLink,
} from 'lucide-react';

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const article = mockArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="p-8 max-w-3xl">
        <Link href="/dashboard/feed" className="flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Feed
        </Link>
        <h1 className="text-xl font-bold">Article not found</h1>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      {/* Back nav */}
      <Link href="/dashboard/feed" className="inline-flex items-center gap-2 text-[13px] text-muted hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Feed
      </Link>

      {/* Meta bar */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <SourceBadge type={article.sourceType} />
        <span className="text-[12px] text-muted">{article.source}</span>
        <span className="text-border">·</span>
        <span className="text-[12px] text-muted">{relativeTime(article.publishedAt)}</span>
        <span className="text-border">·</span>
        <span className="text-[12px] text-muted flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {article.readTime} min read
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight mb-4">
        {article.title}
      </h1>

      {/* Action bar */}
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-border">
        <ScoreBadge score={article.importanceScore} className="text-xs" />
        <span className="text-[12px] text-muted">{article.category}</span>
        <div className="flex-1" />
        <button className="flex items-center gap-1.5 text-[12px] text-muted hover:text-accent transition-colors px-2.5 py-1.5 rounded-lg border border-border hover:border-accent/30">
          <Bookmark className="w-3.5 h-3.5" />
          Save
        </button>
        <button className="flex items-center gap-1.5 text-[12px] text-muted hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg border border-border">
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>
        <button className="flex items-center gap-1.5 text-[12px] text-muted hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg border border-border">
          <ExternalLink className="w-3.5 h-3.5" />
          Source
        </button>
      </div>

      {/* AI Insight */}
      <div className="rounded-xl border border-accent/20 bg-accent/[0.04] p-5 mb-8 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-xs font-mono text-accent uppercase tracking-wider">AI Analysis</span>
        </div>
        <div>
          <span className="text-[11px] font-mono text-accent/50 uppercase tracking-wider">Why this matters to you</span>
          <p className="text-sm text-accent/90 leading-relaxed mt-1">{article.relevanceReason}</p>
        </div>
        <div>
          <span className="text-[11px] font-mono text-accent/50 uppercase tracking-wider">Recommended action</span>
          <p className="text-sm text-accent/80 leading-relaxed mt-1 flex items-start gap-1.5">
            <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            {article.recommendedAction}
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="prose prose-invert prose-sm max-w-none">
        {article.content.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-[14px] text-muted leading-[1.8] mb-4">
            {paragraph}
          </p>
        ))}
      </article>

      {/* Tags */}
      <div className="mt-8 pt-6 border-t border-border">
        <span className="text-[11px] text-muted font-mono uppercase tracking-wider block mb-3">Tags</span>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-lg bg-card border border-border text-[12px] text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
