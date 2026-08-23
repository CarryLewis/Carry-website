'use client';

import Link from 'next/link';
import {
  Brain, Zap, Search, Database, ArrowRight, Layers,
  Radio, BarChart3, Shield, Rss, Mail, AtSign,
  GraduationCap, FlaskConical, ChevronRight,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Interest-Driven Intelligence',
    description: 'Define your professional identity, topics, and goals. The AI curates information around who you are, not just what you search.',
    accent: 'from-blue-500/20 to-transparent',
  },
  {
    icon: Layers,
    title: 'Multi-Source Ingestion',
    description: 'RSS, newsletters, Substack, arXiv, PubMed, Twitter — all unified into a single intelligent feed.',
    accent: 'from-violet-500/20 to-transparent',
  },
  {
    icon: Zap,
    title: 'AI Processing Engine',
    description: 'Every piece of information is analyzed, classified, scored for relevance, and transformed into actionable knowledge.',
    accent: 'from-amber-500/20 to-transparent',
  },
  {
    icon: Search,
    title: 'Deep Research Mode',
    description: 'Ask complex questions. The system searches your collected intelligence, compares sources, and generates structured reports.',
    accent: 'from-emerald-500/20 to-transparent',
  },
  {
    icon: Database,
    title: 'Personal Knowledge Base',
    description: 'Save articles, reports, and research ideas. Build a searchable archive of your intellectual capital.',
    accent: 'from-cyan-500/20 to-transparent',
  },
  {
    icon: BarChart3,
    title: 'Daily Intelligence Brief',
    description: 'Start each day with a prioritized briefing tailored to your work, projects, and evolving interests.',
    accent: 'from-rose-500/20 to-transparent',
  },
];

const pipelineSteps = [
  { label: 'Sources', sublabel: 'RSS, arXiv, PubMed...', icon: Rss },
  { label: 'Ingestion', sublabel: 'Collect & normalize', icon: Mail },
  { label: 'Processing', sublabel: 'AI analysis', icon: Zap },
  { label: 'Matching', sublabel: 'Interest profiles', icon: Brain },
  { label: 'Dashboard', sublabel: 'Your intelligence', icon: BarChart3 },
];

const sourceIcons = [
  { icon: Rss, label: 'RSS', color: 'text-orange-400' },
  { icon: Mail, label: 'Newsletters', color: 'text-violet-400' },
  { icon: FlaskConical, label: 'arXiv', color: 'text-red-400' },
  { icon: GraduationCap, label: 'PubMed', color: 'text-emerald-400' },
  { icon: AtSign, label: 'X / Twitter', color: 'text-sky-400' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <Radio className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold tracking-tight">PIOS</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/dashboard" className="text-[13px] text-muted hover:text-foreground transition-colors hidden sm:block">
              Demo
            </Link>
            <Link href="/research" className="text-[13px] text-muted hover:text-foreground transition-colors hidden sm:block">
              Research
            </Link>
            <Link
              href="/onboarding"
              className="text-[13px] bg-accent hover:bg-accent/90 text-white px-4 py-1.5 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-accent bg-accent/8 border border-accent/15 px-3 py-1.5 rounded-full mb-8">
            <Shield className="w-3 h-3" />
            PERSONAL INTELLIGENCE OPERATING SYSTEM
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-bold tracking-tight leading-[1.08] mb-6">
            Your information,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-violet-400">
              intelligently processed.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Define your interests and professional identity. Connect your sources.
            Let AI transform raw information into personalized, actionable knowledge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/25"
            >
              Build Your Intelligence Profile
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 border border-border hover:border-muted text-foreground px-6 py-3 rounded-xl font-medium transition-colors"
            >
              View Live Demo
              <ChevronRight className="w-4 h-4 text-muted" />
            </Link>
          </div>
        </div>
      </section>

      {/* Source Icons Strip */}
      <section className="py-10 px-6 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-[10px] font-mono text-muted/60 uppercase tracking-widest">Unified Intelligence From</span>
          </div>
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            {sourceIcons.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <span className="text-[10px] text-muted font-mono">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-16 px-6 border-t border-border/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xl font-bold mb-2">How PIOS Works</h2>
            <p className="text-sm text-muted">From raw information to actionable intelligence in five steps</p>
          </div>
          <div className="flex items-start justify-between overflow-x-auto gap-1 py-2">
            {pipelineSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-1 shrink-0">
                <div className="flex flex-col items-center gap-2 w-20 sm:w-28">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-card border border-border flex items-center justify-center group hover:border-accent/30 transition-colors">
                    <step.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-center">
                    <div className="text-[12px] font-medium">{step.label}</div>
                    <div className="text-[10px] text-muted hidden sm:block">{step.sublabel}</div>
                  </div>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <div className="flex items-center mt-[-20px] px-1">
                    <div className="w-6 sm:w-10 h-px bg-gradient-to-r from-border to-accent/30" />
                    <ChevronRight className="w-3 h-3 text-accent/40 -ml-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Core Capabilities</h2>
            <p className="text-sm text-muted">Everything you need to operate with intelligence</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="relative p-6 rounded-xl border border-border bg-card hover:bg-card-hover transition-all group overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-b ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <f.icon className="w-5 h-5 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-[15px] mb-2">{f.title}</h3>
                  <p className="text-[13px] text-muted leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Preview */}
      <section className="py-20 px-6 border-t border-border/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Intelligence, Not Information Overload</h2>
            <p className="text-sm text-muted">Every article is analyzed, scored, and contextualized for you</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-semibold">C</div>
              <div>
                <div className="text-sm font-medium">Good morning, Carry.</div>
                <div className="text-[11px] text-muted">Daily Intelligence Brief · 24 new items · 5 high priority</div>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-background mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-danger px-1.5 py-0.5 rounded bg-danger/10 border border-danger/20">98</span>
                <span className="text-[10px] font-mono text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded">arXiv</span>
                <span className="text-[11px] text-muted">Nature Medicine</span>
              </div>
              <h4 className="text-[14px] font-semibold mb-2">AI ECG Foundation Model Achieves Cardiologist-Level Diagnosis</h4>
              <div className="bg-accent/5 border border-accent/15 rounded-lg p-3">
                <div className="text-[11px] text-accent flex items-start gap-2">
                  <Zap className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>Directly relevant to your ECG Simulator project — read the methodology on temporal-spatial attention.</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link href="/dashboard" className="text-[12px] text-accent hover:underline">
                Explore the full dashboard →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-border/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.06),transparent_60%)]" />
        <div className="max-w-2xl mx-auto text-center relative">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">Your personal intelligence command center.</h2>
          <p className="text-muted mb-8 text-[15px]">Stop drowning in information. Start operating with intelligence.</p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-accent/20"
          >
            Get Started — Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-accent flex items-center justify-center">
              <Radio className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="font-medium">PIOS</span>
            <span className="text-border">·</span>
            <span>Personal Intelligence Operating System</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Demo</Link>
            <Link href="/research" className="hover:text-foreground transition-colors">Research</Link>
            <Link href="/onboarding" className="hover:text-foreground transition-colors">Get Started</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
