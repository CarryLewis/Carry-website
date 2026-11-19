'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, ArrowRight, ArrowLeft, Check, User, Target, Compass, Gauge, Sparkles } from 'lucide-react';
import { profileOptions } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'identity', title: 'Professional Identity', subtitle: 'Who are you? This shapes how we prioritize and contextualize information for you.', icon: User },
  { id: 'topics', title: 'Topics of Interest', subtitle: 'What domains fascinate you? We\'ll build your intelligence feed around these.', icon: Compass },
  { id: 'goals', title: 'Your Goals', subtitle: 'What are you working toward? This helps us recommend actions, not just articles.', icon: Target },
  { id: 'depth', title: 'Information Depth', subtitle: 'How deep do you want to go? Control the granularity of your intelligence.', icon: Gauge },
];

type OptionItem = { label: string; description: string };

function TagSelector({
  options,
  selected,
  onToggle,
}: {
  options: OptionItem[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-2.5">
      {options.map((opt) => {
        const active = selected.includes(opt.label);
        return (
          <button
            key={opt.label}
            onClick={() => onToggle(opt.label)}
            className={cn(
              'text-left px-4 py-3.5 rounded-xl transition-all border group',
              active
                ? 'bg-accent/10 border-accent/30 ring-1 ring-accent/20'
                : 'bg-card border-border hover:border-muted'
            )}
          >
            <div className="flex items-center gap-2">
              {active ? (
                <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full border border-border group-hover:border-muted shrink-0" />
              )}
              <span className={cn('text-[13px] font-medium', active ? 'text-accent' : 'text-foreground')}>
                {opt.label}
              </span>
            </div>
            <p className="text-[11px] text-muted leading-relaxed mt-1.5 ml-6">{opt.description}</p>
          </button>
        );
      })}
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    identities: [] as string[],
    topics: [] as string[],
    goals: [] as string[],
    depths: [] as string[],
  });

  const toggle = (key: keyof typeof profile, val: string) => {
    setProfile((p) => ({
      ...p,
      [key]: p[key].includes(val) ? p[key].filter((v) => v !== val) : [...p[key], val],
    }));
  };

  const currentKey = (['identities', 'topics', 'goals', 'depths'] as const)[step];
  const options = profileOptions[currentKey];

  const totalSelected = Object.values(profile).flat().length;

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left panel — steps (desktop) */}
      <div className="hidden lg:flex w-80 border-r border-border flex-col p-8">
        <div className="flex items-center gap-2.5 mb-14">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Radio className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-semibold tracking-tight text-sm">PIOS</div>
            <div className="text-[10px] text-muted">Intelligence Setup</div>
          </div>
        </div>

        <div className="space-y-5 flex-1">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => i <= step && setStep(i)}
              className={cn(
                'flex items-start gap-3 w-full text-left transition-opacity',
                i <= step ? 'opacity-100' : 'opacity-30 pointer-events-none'
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all text-sm',
                i < step ? 'bg-accent text-white' :
                i === step ? 'bg-accent/10 text-accent border border-accent/30' :
                'bg-card border border-border text-muted'
              )}>
                {i < step ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              </div>
              <div>
                <div className={cn('text-[13px] font-medium', i === step && 'text-accent')}>{s.title}</div>
                <div className="text-[11px] text-muted mt-0.5">
                  {i < step
                    ? `${profile[(['identities', 'topics', 'goals', 'depths'] as const)[i]].length} selected`
                    : i === step ? 'Current step' : 'Upcoming'}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-6 border-t border-border">
          <div className="text-[11px] text-muted mb-1">{totalSelected} items selected across all steps</div>
          <div className="w-full bg-border/50 rounded-full h-1">
            <div className="h-1 rounded-full bg-accent transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Mobile progress bar */}
      <div className="lg:hidden px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
            <Radio className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold text-sm">PIOS Setup</span>
        </div>
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className={cn('h-1 flex-1 rounded-full transition-all', i <= step ? 'bg-accent' : 'bg-border')} />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="max-w-xl w-full">
          <div className="mb-1.5 text-[11px] font-mono text-accent/70">
            STEP {String(step + 1).padStart(2, '0')} OF {String(steps.length).padStart(2, '0')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">{steps[step].title}</h1>
          <p className="text-sm text-muted mb-8 leading-relaxed max-w-md">{steps[step].subtitle}</p>

          <TagSelector
            options={options}
            selected={profile[currentKey]}
            onToggle={(v) => toggle(currentKey, v)}
          />

          {profile[currentKey].length > 0 && (
            <div className="mt-4 text-[11px] text-muted">
              {profile[currentKey].length} selected
            </div>
          )}

          <div className="flex items-center justify-between mt-10">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 text-[13px] text-muted hover:text-foreground disabled:opacity-20 disabled:pointer-events-none transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={() => {
                if (step < steps.length - 1) {
                  setStep(step + 1);
                } else {
                  router.push('/dashboard');
                }
              }}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-lg text-[13px] font-medium transition-colors shadow-sm shadow-accent/20"
            >
              {step < steps.length - 1 ? (
                <>Continue <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Launch Dashboard
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
