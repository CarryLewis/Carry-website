'use client';

import { useState, useEffect, useCallback } from 'react';
import { mockResearchHistory } from '@/lib/mock-data';
import { Search, Send, FileText, Sparkles, ExternalLink, Clock, ArrowLeft, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockReport = {
  query: 'Analyze recent progress in AI ECG diagnosis',
  sections: [
    {
      title: 'Executive Summary',
      content:
        'AI-powered ECG diagnosis has seen transformative advances in 2026. Foundation models trained on millions of ECGs now outperform cardiologists across dozens of conditions. Key breakthroughs include temporal-spatial attention mechanisms, edge deployment on wearables, and regulatory clearance for autonomous diagnosis systems.',
    },
    {
      title: 'Key Developments',
      content:
        '1. Foundation Models — The Stanford-DeepMind ECG model (8.5M training ECGs, 94.2% accuracy across 77 conditions) represents the largest and most capable model to date.\n\n2. Edge Deployment — CardioSense Pro received FDA 510(k) clearance for on-device AI cardiac monitoring, processing 12-lead equivalent signals from a single-lead wearable.\n\n3. Open Source — MedPaLM-Open includes cardiac-specific modules that achieve 91% on ECG interpretation benchmarks, enabling academic research access.\n\n4. Federated Learning — A 15-hospital consortium demonstrated that federated ECG models achieve 98.7% of centralized performance without sharing patient data.',
    },
    {
      title: 'Technical Trends',
      content:
        '• Self-supervised pretraining on unlabeled ECGs is reducing the need for expert annotations by 80%\n• Multi-modal fusion combining ECG with clinical notes improves diagnostic accuracy by 12%\n• Explainability methods (GradCAM for temporal signals) are becoming required for regulatory submissions\n• Federated learning enables multi-institutional training without data sharing\n• Temporal-spatial attention blocks simultaneously capture beat-to-beat morphology and spatial voltage gradients',
    },
    {
      title: 'Implications for Your Work',
      content:
        'Given your ECG Simulator project, the temporal-spatial attention architecture from the Stanford-DeepMind model could be integrated into your simulation framework. The open-source MedPaLM-Open cardiac modules provide an immediate baseline for evaluation. Consider aligning your simulator output format with the preprocessing pipeline described in the Nature Medicine paper.\n\nThe federated learning approach opens a path for multi-hospital validation without the regulatory burden of centralized data collection.',
    },
    {
      title: 'Knowledge Gaps',
      content:
        '• Limited data on performance in pediatric populations\n• No published benchmarks for low-resource ECG devices common in developing countries\n• Long-term monitoring accuracy (>30 days continuous) remains unvalidated\n• Integration with existing EHR systems is underdocumented',
    },
  ],
  sources: [
    { title: 'Nature Medicine — AI ECG Foundation Model', date: 'Jul 2026', type: 'Journal' },
    { title: 'FDA 510(k) Database — CardioSense Pro Clearance', date: 'Jul 2026', type: 'Regulatory' },
    { title: 'arXiv:2607.14523 — MedPaLM-Open Technical Report', date: 'Jul 2026', type: 'Preprint' },
    { title: 'JAMA Cardiology — Self-Supervised ECG Pretraining', date: 'Jun 2026', type: 'Journal' },
    { title: 'IEEE TBME — Federated ECG Learning Across 12 Institutions', date: 'Jun 2026', type: 'Journal' },
    { title: 'The Lancet Digital Health — Cross-Hospital ECG Analysis', date: 'Jul 2026', type: 'Journal' },
  ],
};

const suggestedQueries = [
  'Compare transformer vs. CNN architectures for ECG classification',
  'What are the latest FDA-approved AI cardiac diagnostic tools?',
  'Summarize CRISPR applications in cardiac gene therapy',
  'How is digital twin technology used in clinical trials?',
  'Federated learning approaches for medical imaging privacy',
  'Recent advances in neural interface signal processing',
];

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [phase, setPhase] = useState<'idle' | 'loading' | 'report'>('idle');
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    'Searching collected intelligence...',
    'Analyzing 24 relevant articles...',
    'Comparing sources and findings...',
    'Generating structured report...',
  ];

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;
    setPhase('loading');
    setLoadingStep(0);
  }, [query]);

  useEffect(() => {
    if (phase !== 'loading') return;
    if (loadingStep < loadingSteps.length - 1) {
      const timer = setTimeout(() => setLoadingStep(s => s + 1), 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setPhase('report'), 600);
      return () => clearTimeout(timer);
    }
  }, [phase, loadingStep, loadingSteps.length]);

  const resetToIdle = () => {
    setPhase('idle');
    setQuery('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl">
        {/* Main area */}
        <div className="flex-1 max-w-3xl">
          {/* Header */}
          <div className="mb-6">
            {phase === 'report' ? (
              <button onClick={resetToIdle} className="flex items-center gap-2 text-[13px] text-muted hover:text-foreground mb-4 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                New Research Query
              </button>
            ) : null}
            <h1 className="text-2xl font-bold tracking-tight mb-1">Deep Research</h1>
            <p className="text-sm text-muted">
              Ask complex questions. The system searches your collected intelligence and generates structured reports.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Ask a research question..."
              className="w-full bg-card border border-border rounded-xl pl-12 pr-14 py-4 text-[15px] placeholder:text-muted/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
              disabled={phase === 'loading'}
            />
            <button
              onClick={handleSearch}
              disabled={phase === 'loading' || !query.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-accent rounded-lg flex items-center justify-center hover:bg-accent/90 transition-colors disabled:opacity-40"
            >
              {phase === 'loading' ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </div>

          {/* Loading state */}
          {phase === 'loading' && (
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-xs font-mono text-accent uppercase tracking-wider">Generating Report</span>
              </div>
              <div className="space-y-3">
                {loadingSteps.map((step, i) => (
                  <div key={step} className={cn(
                    'flex items-center gap-3 text-sm transition-all duration-300',
                    i < loadingStep ? 'text-success' :
                    i === loadingStep ? 'text-accent' :
                    'text-muted/30'
                  )}>
                    {i < loadingStep ? (
                      <div className="w-4 h-4 rounded-full bg-success/20 flex items-center justify-center"><span className="text-[10px]">✓</span></div>
                    ) : i === loadingStep ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-border" />
                    )}
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Idle — Suggested Queries */}
          {phase === 'idle' && (
            <div>
              <div className="text-[10px] text-muted font-mono uppercase tracking-widest mb-3">Suggested Queries</div>
              <div className="grid sm:grid-cols-2 gap-2">
                {suggestedQueries.map((q) => (
                  <button
                    key={q}
                    onClick={() => { setQuery(q); setPhase('loading'); setLoadingStep(0); }}
                    className="text-left px-4 py-3 rounded-xl border border-border bg-card hover:bg-card-hover text-[13px] text-muted hover:text-foreground transition-colors"
                  >
                    <Search className="w-3 h-3 inline mr-2 text-accent/50" />
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Report */}
          {phase === 'report' && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-[11px] text-accent font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                RESEARCH REPORT · {mockReport.sources.length} sources cited · Generated from 24 articles
              </div>

              {mockReport.sections.map((section, i) => (
                <div key={section.title} className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="px-5 py-3 border-b border-border/50 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-accent" />
                    <h3 className="font-semibold text-[14px]">{section.title}</h3>
                    <span className="text-[10px] text-muted font-mono ml-auto">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="px-5 py-4">
                    <div className="text-[13px] text-muted leading-[1.75] whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-5 py-3 border-b border-border/50 flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-accent" />
                  <h3 className="font-semibold text-[14px]">Sources</h3>
                  <span className="text-[10px] text-muted font-mono ml-auto">{mockReport.sources.length}</span>
                </div>
                <div className="divide-y divide-border/50">
                  {mockReport.sources.map((s) => (
                    <div key={s.title} className="px-5 py-3 flex items-center justify-between hover:bg-card-hover transition-colors cursor-pointer">
                      <span className="text-[13px] text-muted hover:text-accent transition-colors">{s.title}</span>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        <span className="text-[10px] text-muted/60 font-mono">{s.date}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-card border border-border text-muted">{s.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar — Research History */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-8">
            <h3 className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">Research History</h3>
            <div className="space-y-2">
              {mockResearchHistory.map((h) => (
                <button
                  key={h.id}
                  onClick={() => { setQuery(h.query); setPhase('loading'); setLoadingStep(0); }}
                  className="w-full text-left p-3 rounded-xl border border-border bg-card hover:bg-card-hover transition-colors"
                >
                  <div className="text-[12px] font-medium leading-snug mb-1.5 line-clamp-2">{h.query}</div>
                  <div className="flex items-center gap-2 text-[10px] text-muted">
                    <Clock className="w-3 h-3" />
                    <span>{h.date}</span>
                    <span className="text-border">·</span>
                    <span>{h.resultCount} results</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
