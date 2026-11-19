'use client';

import { useState } from 'react';
import { mockArticles, mockCategories } from '@/lib/mock-data';
import ArticleCard, { ArticleCardCompact } from '@/components/dashboard/ArticleCard';
import { SlidersHorizontal, List, LayoutGrid, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type SortMode = 'relevance' | 'date' | 'readTime';

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortMode>('relevance');
  const [viewMode, setViewMode] = useState<'expanded' | 'compact'>('expanded');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockArticles
    .filter((a) => activeCategory === 'All' || a.category === activeCategory)
    .filter((a) => !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.summary.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'relevance') return b.importanceScore - a.importanceScore;
      if (sortBy === 'date') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      return a.readTime - b.readTime;
    });

  const readCount = filtered.filter(a => a.isRead).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Knowledge Feed</h1>
          <p className="text-sm text-muted">
            {filtered.length} articles · {readCount} read · {filtered.filter(a => a.isSaved).length} saved
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('expanded')}
            className={cn('p-2 rounded-lg transition-colors', viewMode === 'expanded' ? 'bg-accent/10 text-accent' : 'text-muted hover:text-foreground')}
            title="Expanded view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('compact')}
            className={cn('p-2 rounded-lg transition-colors', viewMode === 'compact' ? 'bg-accent/10 text-accent' : 'text-muted hover:text-foreground')}
            title="Compact view"
          >
            <List className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-border mx-1" />
          <SlidersHorizontal className="w-4 h-4 text-muted" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortMode)}
            className="bg-card border border-border text-[13px] rounded-lg px-2.5 py-1.5 text-foreground focus:outline-none focus:border-accent"
          >
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="readTime">Read Time</option>
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter articles..."
          className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-[13px] placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-none">
        {mockCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all border',
              activeCategory === cat
                ? 'bg-accent text-white border-accent shadow-sm shadow-accent/20'
                : 'bg-card border-border text-muted hover:text-foreground hover:border-muted'
            )}
          >
            {cat}
            {cat !== 'All' && (
              <span className="ml-1 text-[10px] opacity-60">
                {mockArticles.filter(a => a.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Reading progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-muted font-mono">READING PROGRESS</span>
          <span className="text-[11px] text-muted">{readCount}/{filtered.length}</span>
        </div>
        <div className="w-full bg-border/50 rounded-full h-1">
          <div
            className="h-1 rounded-full bg-accent transition-all"
            style={{ width: `${filtered.length ? (readCount / filtered.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Articles */}
      <div className={cn(viewMode === 'compact' ? 'space-y-1.5' : 'space-y-4')}>
        {filtered.map((article) =>
          viewMode === 'compact' ? (
            <ArticleCardCompact key={article.id} article={article} />
          ) : (
            <ArticleCard key={article.id} article={article} />
          )
        )}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted text-sm">
            No articles match your current filters.
          </div>
        )}
      </div>
    </div>
  );
}
