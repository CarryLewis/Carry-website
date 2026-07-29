'use client';

import { useState } from 'react';
import { mockArticles, mockCategories } from '@/lib/mock-data';
import ArticleCard from '@/components/dashboard/ArticleCard';
import { SlidersHorizontal } from 'lucide-react';

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'date'>('relevance');

  const filtered = mockArticles
    .filter((a) => activeCategory === 'All' || a.category === activeCategory)
    .sort((a, b) =>
      sortBy === 'relevance'
        ? b.importanceScore - a.importanceScore
        : new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Knowledge Feed</h1>
          <p className="text-sm text-muted">{mockArticles.length} articles from {18} sources</p>
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'relevance' | 'date')}
            className="bg-card border border-border text-sm rounded-lg px-3 py-1.5 text-foreground"
          >
            <option value="relevance">By Relevance</option>
            <option value="date">By Date</option>
          </select>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {mockCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
              activeCategory === cat
                ? 'bg-accent text-white border-accent'
                : 'bg-card border-border text-muted hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="space-y-4">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted">
            No articles in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
