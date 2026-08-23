'use client';

import { mockDailyBrief, mockArticles, mockTopicClusters, mockWeeklyTrend } from '@/lib/mock-data';
import ArticleCard from '@/components/dashboard/ArticleCard';
import MiniSparkline from '@/components/ui/MiniSparkline';
import { Zap, FileText, Bookmark, Radio, TrendingUp, TrendingDown, ArrowRight, Clock, Activity } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const statCards = [
  { label: 'New Today', value: mockDailyBrief.stats.newArticles, icon: FileText, color: 'text-accent', change: '+6' },
  { label: 'High Priority', value: mockDailyBrief.stats.highPriority, icon: Zap, color: 'text-danger', change: '+2' },
  { label: 'Saved', value: mockDailyBrief.stats.savedItems, icon: Bookmark, color: 'text-warning', change: '+3' },
  { label: 'Sources Active', value: mockDailyBrief.stats.sourcesActive, icon: Radio, color: 'text-success', change: '0' },
];

export default function DashboardPage() {
  const topArticles = mockArticles
    .filter((a) => a.importanceScore >= 85)
    .sort((a, b) => b.importanceScore - a.importanceScore);

  const recentlyRead = mockArticles.filter(a => a.isRead).slice(0, 3);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 tracking-tight">{mockDailyBrief.greeting}</h1>
        <p className="text-sm text-muted flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-accent" />
          {mockDailyBrief.date} · Daily Intelligence Brief
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="p-4 rounded-xl border border-border bg-card group hover:bg-card-hover transition-colors">
            <div className="flex items-center justify-between mb-3">
              <s.icon className={cn('w-4 h-4', s.color)} />
              <span className={cn(
                'text-[11px] font-mono',
                s.change.startsWith('+') ? 'text-success' : s.change === '0' ? 'text-muted' : 'text-danger'
              )}>
                {s.change !== '0' && (
                  s.change.startsWith('+')
                    ? <TrendingUp className="w-3 h-3 inline mr-0.5" />
                    : <TrendingDown className="w-3 h-3 inline mr-0.5" />
                )}
                {s.change === '0' ? '—' : s.change}
              </span>
            </div>
            <div className="text-2xl font-bold tabular-nums">{s.value}</div>
            <div className="text-[11px] text-muted mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        {/* Main column */}
        <div>
          {/* High Priority Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" />
                <h2 className="font-semibold text-sm">High Priority</h2>
                <span className="text-[11px] text-muted ml-1">Items most relevant to your current work</span>
              </div>
              <Link href="/dashboard/feed" className="flex items-center gap-1 text-[11px] text-accent hover:underline">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {topArticles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="brief" />
              ))}
            </div>
          </div>

          {/* Recently Read */}
          {recentlyRead.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-3.5 h-3.5 text-muted" />
                <h2 className="font-semibold text-sm text-muted">Recently Read</h2>
              </div>
              <div className="space-y-2">
                {recentlyRead.map((article) => (
                  <Link
                    key={article.id}
                    href={`/dashboard/article/${article.id}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border/50 bg-card/50 hover:bg-card transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] text-muted truncate">{article.title}</div>
                      <div className="text-[11px] text-muted/60 mt-0.5">{article.source} · {article.readTime} min</div>
                    </div>
                    <span className="text-[10px] text-success shrink-0">✓ Read</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Weekly Activity */}
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono text-muted uppercase tracking-wider">Weekly Activity</h3>
              <MiniSparkline data={mockWeeklyTrend.map(d => d.articles)} color="#3b82f6" width={64} height={24} />
            </div>
            <div className="grid grid-cols-7 gap-1">
              {mockWeeklyTrend.map((d) => {
                const intensity = d.articles / 30;
                return (
                  <div key={d.day} className="text-center">
                    <div
                      className="w-full aspect-square rounded-md mb-1"
                      style={{
                        backgroundColor: `rgba(59, 130, 246, ${Math.max(0.08, intensity)})`,
                      }}
                      title={`${d.day}: ${d.articles} articles, ${d.highPriority} high priority`}
                    />
                    <span className="text-[9px] text-muted font-mono">{d.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Topic Clusters */}
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Topic Clusters</h3>
            <div className="space-y-2.5">
              {mockTopicClusters.map((topic) => (
                <div key={topic.name} className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: topic.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] truncate">{topic.name}</span>
                      <span className="text-[11px] text-muted tabular-nums">{topic.count}</span>
                    </div>
                    <div className="w-full bg-border/50 rounded-full h-1 mt-1">
                      <div
                        className="h-1 rounded-full transition-all"
                        style={{ width: `${(topic.count / 4) * 100}%`, backgroundColor: topic.color }}
                      />
                    </div>
                  </div>
                  <span className={cn(
                    'text-[10px] font-mono tabular-nums shrink-0',
                    topic.trend > 0 ? 'text-success' : topic.trend < 0 ? 'text-danger' : 'text-muted'
                  )}>
                    {topic.trend > 0 ? '+' : ''}{topic.trend}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 rounded-xl border border-border bg-card">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="space-y-1.5">
              <Link href="/research" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-muted hover:text-foreground hover:bg-card-hover transition-colors">
                <span className="text-accent">→</span> Start a research query
              </Link>
              <Link href="/dashboard/feed" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-muted hover:text-foreground hover:bg-card-hover transition-colors">
                <span className="text-accent">→</span> Browse full feed
              </Link>
              <Link href="/knowledge" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-muted hover:text-foreground hover:bg-card-hover transition-colors">
                <span className="text-accent">→</span> Review saved items
              </Link>
              <Link href="/onboarding" className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] text-muted hover:text-foreground hover:bg-card-hover transition-colors">
                <span className="text-accent">→</span> Update your profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
