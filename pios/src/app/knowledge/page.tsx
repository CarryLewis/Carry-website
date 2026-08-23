'use client';

import { useState } from 'react';
import { mockArticles, mockNotes } from '@/lib/mock-data';
import { relativeTime, cn } from '@/lib/utils';
import ScoreBadge from '@/components/ui/ScoreBadge';
import SourceBadge from '@/components/ui/SourceBadge';
import Link from 'next/link';
import {
  Bookmark, Search, FolderOpen, FileText, StickyNote, Lightbulb,
  Grid3X3, List, Clock, Tag, Plus,
} from 'lucide-react';

const collections = [
  { name: 'All Saved', icon: Bookmark, count: 12, color: 'text-accent' },
  { name: 'Research Papers', icon: FileText, count: 5, color: 'text-emerald-400' },
  { name: 'Ideas', icon: Lightbulb, count: 3, color: 'text-yellow-400' },
  { name: 'Notes', icon: StickyNote, count: 4, color: 'text-violet-400' },
];

type ViewTab = 'saved' | 'notes';

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [activeTab, setActiveTab] = useState<ViewTab>('saved');
  const saved = mockArticles.filter((a) => a.isSaved);

  const filteredSaved = saved.filter(a =>
    !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNotes = mockNotes.filter(n =>
    !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allTags = [...new Set(saved.flatMap(a => a.tags))];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Knowledge Base</h1>
          <p className="text-sm text-muted">Your personal archive of research, ideas, and notes</p>
        </div>
        <button className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg text-[13px] font-medium transition-colors self-start shadow-sm shadow-accent/20">
          <Plus className="w-3.5 h-3.5" />
          New Note
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your knowledge base..."
          className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-3 text-[13px] placeholder:text-muted/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
        />
      </div>

      {/* Collections */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
        {collections.map((c) => (
          <button
            key={c.name}
            className="p-4 rounded-xl border border-border bg-card hover:bg-card-hover transition-all text-left group"
          >
            <c.icon className={cn('w-4 h-4 mb-2.5 group-hover:scale-110 transition-transform', c.color)} />
            <div className="text-[13px] font-medium">{c.name}</div>
            <div className="text-[11px] text-muted mt-0.5">{c.count} items</div>
          </button>
        ))}
      </div>

      {/* Tabs + View toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 p-0.5 rounded-lg bg-card border border-border">
          <button
            onClick={() => setActiveTab('saved')}
            className={cn(
              'px-3 py-1.5 rounded-md text-[12px] font-medium transition-all',
              activeTab === 'saved' ? 'bg-accent text-white shadow-sm' : 'text-muted hover:text-foreground'
            )}
          >
            <Bookmark className="w-3 h-3 inline mr-1.5 -mt-0.5" />
            Saved Articles ({saved.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={cn(
              'px-3 py-1.5 rounded-md text-[12px] font-medium transition-all',
              activeTab === 'notes' ? 'bg-accent text-white shadow-sm' : 'text-muted hover:text-foreground'
            )}
          >
            <StickyNote className="w-3 h-3 inline mr-1.5 -mt-0.5" />
            Notes ({mockNotes.length})
          </button>
        </div>
        {activeTab === 'saved' && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('list')}
              className={cn('p-2 rounded-lg transition-colors', viewMode === 'list' ? 'bg-accent/10 text-accent' : 'text-muted hover:text-foreground')}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn('p-2 rounded-lg transition-colors', viewMode === 'grid' ? 'bg-accent/10 text-accent' : 'text-muted hover:text-foreground')}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Saved Articles Tab */}
      {activeTab === 'saved' && (
        <>
          {viewMode === 'list' ? (
            <div className="space-y-1.5">
              {filteredSaved.map((article) => (
                <Link
                  key={article.id}
                  href={`/dashboard/article/${article.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-card-hover transition-colors"
                >
                  <ScoreBadge score={article.importanceScore} />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-medium truncate">{article.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-muted">
                      <span>{article.source}</span>
                      <span className="text-border">·</span>
                      <span>{article.category}</span>
                      <span className="text-border">·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}m</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 ml-2">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Bookmark className="w-4 h-4 text-accent fill-accent shrink-0" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSaved.map((article) => (
                <Link
                  key={article.id}
                  href={`/dashboard/article/${article.id}`}
                  className="p-4 rounded-xl border border-border bg-card hover:bg-card-hover transition-colors group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <SourceBadge type={article.sourceType} />
                    <ScoreBadge score={article.importanceScore} />
                  </div>
                  <h3 className="text-[13px] font-medium leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-[11px] text-muted leading-relaxed mb-3 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-muted">
                    <span>{article.source}</span>
                    <span>{relativeTime(article.publishedAt)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {filteredSaved.length === 0 && (
            <div className="text-center py-16 text-muted text-sm">
              {searchQuery ? 'No saved items match your search.' : 'No saved items yet. Bookmark articles from your feed.'}
            </div>
          )}
        </>
      )}

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-3">
          {filteredNotes.map((note) => (
            <div key={note.id} className="p-5 rounded-xl border border-border bg-card hover:bg-card-hover transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[14px] font-medium">{note.title}</h3>
                <span className="text-[11px] text-muted flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {relativeTime(note.createdAt)}
                </span>
              </div>
              <p className="text-[13px] text-muted leading-relaxed mb-3">{note.content}</p>
              <div className="flex items-center gap-2">
                {note.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-background border border-border text-[10px] text-muted">
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
                {note.linkedArticleId && (
                  <Link
                    href={`/dashboard/article/${note.linkedArticleId}`}
                    className="text-[10px] text-accent hover:underline ml-auto"
                  >
                    View linked article →
                  </Link>
                )}
              </div>
            </div>
          ))}
          {filteredNotes.length === 0 && (
            <div className="text-center py-16 text-muted text-sm">
              {searchQuery ? 'No notes match your search.' : 'No notes yet. Create your first note.'}
            </div>
          )}
        </div>
      )}

      {/* Tag Cloud */}
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">All Tags</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-lg bg-card border border-border text-[11px] text-muted hover:text-accent hover:border-accent/30 transition-colors cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
