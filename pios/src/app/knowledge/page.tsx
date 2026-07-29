'use client';

import { useState } from 'react';
import { mockArticles } from '@/lib/mock-data';
import { Bookmark, Search, FolderOpen, FileText, StickyNote, Lightbulb, Grid3X3, List } from 'lucide-react';

const collections = [
  { name: 'All Saved', icon: Bookmark, count: 12 },
  { name: 'Research Papers', icon: FileText, count: 5 },
  { name: 'Ideas', icon: Lightbulb, count: 3 },
  { name: 'Notes', icon: StickyNote, count: 4 },
];

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const saved = mockArticles.filter((a) => a.isSaved);

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Knowledge Base</h1>
          <p className="text-sm text-muted">Your personal archive of research and ideas</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-accent-soft text-accent' : 'text-muted hover:text-foreground'}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-accent-soft text-accent' : 'text-muted hover:text-foreground'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your knowledge base..."
          className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 text-sm placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Collections */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {collections.map((c) => (
          <button
            key={c.name}
            className="p-4 rounded-xl border border-border bg-card hover:bg-card-hover transition-colors text-left group"
          >
            <c.icon className="w-4 h-4 text-accent mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-medium">{c.name}</div>
            <div className="text-xs text-muted">{c.count} items</div>
          </button>
        ))}
      </div>

      {/* Saved Items */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <FolderOpen className="w-4 h-4 text-muted" />
          <h2 className="font-semibold text-sm">Recently Saved</h2>
        </div>
        <div className="space-y-2">
          {saved.map((article) => (
            <div
              key={article.id}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-card-hover transition-colors cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{article.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                  <span>{article.source}</span>
                  <span>·</span>
                  <span>{article.category}</span>
                  <span>·</span>
                  <span>{article.readTime} min read</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {article.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-card border border-border text-[11px] text-muted">
                    {tag}
                  </span>
                ))}
                <Bookmark className="w-4 h-4 text-accent fill-accent" />
              </div>
            </div>
          ))}
          {saved.length === 0 && (
            <div className="text-center py-16 text-muted text-sm">
              No saved items yet. Bookmark articles from your feed to build your knowledge base.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
