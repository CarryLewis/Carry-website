'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, ArrowRight, ArrowLeft, Check, User, Target, Compass, Gauge } from 'lucide-react';
import { profileOptions } from '@/lib/mock-data';

const steps = [
  { id: 'identity', title: 'Professional Identity', subtitle: 'Who are you?', icon: User },
  { id: 'topics', title: 'Topics of Interest', subtitle: 'What fascinates you?', icon: Compass },
  { id: 'goals', title: 'Your Goals', subtitle: 'What are you working toward?', icon: Target },
  { id: 'depth', title: 'Information Depth', subtitle: 'How deep do you want to go?', icon: Gauge },
];

function TagSelector({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
              active
                ? 'bg-accent text-white border-accent'
                : 'bg-card border-border text-muted hover:text-foreground hover:border-muted'
            }`}
          >
            {active && <Check className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
            {opt}
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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — steps */}
      <div className="hidden lg:flex w-80 border-r border-border flex-col p-8">
        <div className="flex items-center gap-2 mb-12">
          <Radio className="w-5 h-5 text-accent" />
          <span className="font-semibold tracking-tight">PIOS</span>
        </div>
        <div className="space-y-6 flex-1">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`flex items-start gap-3 ${i <= step ? 'text-foreground' : 'text-muted/50'}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  i < step ? 'bg-accent text-white' : i === step ? 'bg-accent-soft text-accent border border-accent/30' : 'bg-card border border-border'
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-sm font-medium">{s.title}</div>
                <div className="text-xs text-muted">{s.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted">Step {step + 1} of {steps.length}</div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-lg w-full">
          <div className="mb-2 text-xs font-mono text-accent">
            {String(step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
          </div>
          <h1 className="text-3xl font-bold mb-2">{steps[step].title}</h1>
          <p className="text-muted mb-8">{steps[step].subtitle} Select all that apply.</p>

          <TagSelector
            options={options}
            selected={profile[currentKey]}
            onToggle={(v) => toggle(currentKey, v)}
          />

          <div className="flex items-center justify-between mt-12">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="flex items-center gap-2 text-sm text-muted hover:text-foreground disabled:opacity-30 transition-colors"
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
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              {step < steps.length - 1 ? 'Continue' : 'Launch Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
