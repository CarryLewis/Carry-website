'use client';

import { useState } from 'react';
import { Search, Send, FileText, Sparkles, ExternalLink } from 'lucide-react';

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
        '1. **Foundation Models**: The Stanford-DeepMind ECG model (8.5M training ECGs, 94.2% accuracy across 77 conditions) represents the largest and most capable model to date.\n\n2. **Edge Deployment**: CardioSense Pro received FDA 510(k) clearance for on-device AI cardiac monitoring, processing 12-lead equivalent signals from a single-lead wearable.\n\n3. **Open Source**: MedPaLM-Open includes cardiac-specific modules that achieve 91% on ECG interpretation benchmarks, enabling academic research access.',
    },
    {
      title: 'Technical Trends',
      content:
        '- **Self-supervised pretraining** on unlabeled ECGs is reducing the need for expert annotations by 80%\n- **Multi-modal fusion** combining ECG with clinical notes improves diagnostic accuracy by 12%\n- **Explainability** methods (GradCAM for temporal signals) are becoming required for regulatory submissions\n- **Federated learning** enables multi-institutional training without data sharing',
    },
    {
      title: 'Implications for Your Work',
      content:
        'Given your ECG Simulator project, the temporal-spatial attention architecture from the Stanford-DeepMind model could be integrated into your simulation framework. The open-source MedPaLM-Open cardiac modules provide an immediate baseline. Consider aligning your simulator output format with the preprocessing pipeline described in the Nature Medicine paper.',
    },
  ],
  sources: [
    'Nature Medicine — AI ECG Foundation Model (Jul 2026)',
    'FDA 510(k) Database — CardioSense Pro Clearance',
    'arXiv:2607.14523 — MedPaLM-Open Technical Report',
    'JAMA Cardiology — Self-Supervised ECG Pretraining',
    'IEEE TBME — Federated ECG Learning Across 12 Institutions',
  ],
};

const suggestedQueries = [
  'Compare transformer vs. CNN architectures for ECG classification',
  'What are the latest FDA-approved AI cardiac diagnostic tools?',
  'Summarize CRISPR applications in cardiac gene therapy',
  'How is digital twin technology used in clinical trials?',
];

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [showReport, setShowReport] = useState(false);

  const handleSearch = () => {
    if (query.trim()) setShowReport(true);
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Deep Research</h1>
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
          className="w-full bg-card border border-border rounded-xl pl-12 pr-14 py-4 text-[15px] placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-accent rounded-lg flex items-center justify-center hover:bg-accent/90 transition-colors"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Suggested Queries */}
      {!showReport && (
        <div className="mb-10">
          <div className="text-xs text-muted mb-3 font-mono">SUGGESTED QUERIES</div>
          <div className="grid gap-2">
            {suggestedQueries.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setQuery(q);
                  setShowReport(true);
                }}
                className="text-left px-4 py-3 rounded-lg border border-border bg-card hover:bg-card-hover text-sm text-muted hover:text-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Report */}
      {showReport && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs text-accent font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            RESEARCH REPORT · Generated from 24 collected articles · 5 sources cited
          </div>

          {mockReport.sections.map((section) => (
            <div key={section.title} className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                {section.title}
              </h3>
              <div className="text-sm text-muted leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-3">Sources</h3>
            <ul className="space-y-2">
              {mockReport.sources.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors cursor-pointer">
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
