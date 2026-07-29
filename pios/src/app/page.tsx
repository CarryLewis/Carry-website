'use client';

import Link from 'next/link';
import {
  Brain, Zap, Search, Database, ArrowRight, Layers,
  Radio, BarChart3, Shield,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Interest-Driven Intelligence',
    description: 'Define your professional identity, topics, and goals. The AI curates information around who you are, not just what you search.',
  },
  {
    icon: Layers,
    title: 'Multi-Source Ingestion',
    description: 'RSS, newsletters, Substack, arXiv, PubMed, Twitter — all unified into a single intelligent feed.',
  },
  {
    icon: Zap,
    title: 'AI Processing Engine',
    description: 'Every piece of information is analyzed, classified, scored for relevance, and transformed into actionable knowledge.',
  },
  {
    icon: Search,
    title: 'Deep Research Mode',
    description: 'Ask complex questions. The system searches your collected intelligence, compares sources, and generates structured reports.',
  },
  {
    icon: Database,
    title: 'Personal Knowledge Base',
    description: 'Save articles, reports, and research ideas. Build a searchable archive of your intellectual capital.',
  },
  {
    icon: BarChart3,
    title: 'Daily Intelligence Brief',
    description: 'Start each day with a prioritized briefing tailored to your work, projects, and evolving interests.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-accent" />
            <span className="font-semibold tracking-tight text-lg">PIOS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-muted hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link
              href="/onboarding"
              className="text-sm bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent bg-accent-soft px-3 py-1.5 rounded-full mb-8">
            <Shield className="w-3 h-3" />
            PERSONAL INTELLIGENCE OPERATING SYSTEM
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Your information.
            <br />
            <span className="text-muted">Intelligently processed.</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Define your interests, connect your sources, and let AI transform raw information
            into personalized, actionable knowledge — delivered as a daily intelligence brief.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Build Your Profile
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 border border-border hover:border-muted text-foreground px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Pipeline Visualization */}
      <section className="py-16 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between overflow-x-auto gap-2 py-4">
            {['Sources', 'Ingestion', 'Raw Data', 'AI Engine', 'Matching', 'Dashboard', 'Output'].map((step, i) => (
              <div key={step} className="flex items-center gap-2 shrink-0">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-xs font-mono text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span className="text-[11px] text-muted font-mono">{step}</span>
                </div>
                {i < 6 && <ArrowRight className="w-3 h-3 text-border mt-[-14px]" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-border bg-card hover:bg-card-hover transition-colors group"
              >
                <f.icon className="w-5 h-5 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Your personal intelligence command center.</h2>
          <p className="text-muted mb-8">Stop drowning in information. Start operating with intelligence.</p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-accent" />
            <span>PIOS</span>
          </div>
          <span>Personal Intelligence Operating System</span>
        </div>
      </footer>
    </div>
  );
}
