'use client';

import { mockDailyBrief, mockArticles } from '@/lib/mock-data';
import ArticleCard from '@/components/dashboard/ArticleCard';
import { Zap, FileText, Bookmark, Radio, TrendingUp } from 'lucide-react';

const statCards = [
  { label: 'New Today', value: mockDailyBrief.stats.newArticles, icon: FileText, color: 'text-accent' },
  { label: 'High Priority', value: mockDailyBrief.stats.highPriority, icon: Zap, color: 'text-danger' },
  { label: 'Saved', value: mockDailyBrief.stats.savedItems, icon: Bookmark, color: 'text-warning' },
  { label: 'Sources Active', value: mockDailyBrief.stats.sourcesActive, icon: Radio, color: 'text-success' },
];

export default function DashboardPage() {
  const topArticles = mockArticles.filter((a) => a.importanceScore >= 85).sort((a, b) => b.importanceScore - a.importanceScore);

  return (
    <div className="p-8 max-w-5xl">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">{mockDailyBrief.greeting}</h1>
        <p className="text-sm text-muted">{mockDailyBrief.date} · Daily Intelligence Brief</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {statCards.map((s) => (
          <div key={s.label} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <TrendingUp className="w-3 h-3 text-success" />
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* High Priority Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-danger" />
          <h2 className="font-semibold">High Priority</h2>
          <span className="text-xs text-muted">— Items most relevant to your current work</span>
        </div>
        <div className="space-y-4">
          {topArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
