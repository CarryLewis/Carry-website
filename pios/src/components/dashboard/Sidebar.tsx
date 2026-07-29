'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Radio, LayoutDashboard, Newspaper, Search, Database,
  Settings, User, LogOut, Menu, X, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockUser } from '@/lib/mock-data';

const navItems = [
  { href: '/dashboard', label: 'Brief', icon: LayoutDashboard, description: 'Daily intelligence' },
  { href: '/dashboard/feed', label: 'Feed', icon: Newspaper, description: 'Knowledge stream' },
  { href: '/research', label: 'Research', icon: Search, description: 'Deep analysis' },
  { href: '/knowledge', label: 'Knowledge', icon: Database, description: 'Saved & notes' },
];

const bottomItems = [
  { href: '/onboarding', label: 'Profile', icon: User },
  { href: '#', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-5 h-14 border-b border-border shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
            <Radio className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-semibold tracking-tight text-sm">PIOS</span>
        </Link>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden text-muted">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-mono text-muted/60 uppercase tracking-widest">Navigation</div>
        {navItems.map((item) => {
          const active = pathname === item.href ||
            (item.href === '/dashboard' && pathname === '/dashboard') ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group',
                active
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted hover:text-foreground hover:bg-card'
              )}
            >
              <item.icon className={cn('w-4 h-4 shrink-0', active && 'text-accent')} />
              <div className="flex-1 min-w-0">
                <div className={cn('text-[13px]', active && 'font-medium')}>{item.label}</div>
              </div>
              {active && <ChevronRight className="w-3 h-3 text-accent/50" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-border space-y-0.5 shrink-0">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-muted hover:text-foreground hover:bg-card transition-colors"
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </div>

      <div className="px-3 pb-4 shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-card border border-border">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-semibold">
            {mockUser.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium truncate">{mockUser.name}</div>
            <div className="text-[11px] text-muted truncate">{mockUser.professionalIdentity[0]}</div>
          </div>
          <button className="text-muted hover:text-danger transition-colors" title="Sign out">
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-background/80 backdrop-blur-xl border-b border-border flex items-center px-4">
        <button onClick={() => setMobileOpen(true)} className="text-muted hover:text-foreground">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 ml-3">
          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
            <Radio className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-sm">PIOS</span>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <aside
            className="w-64 bg-background border-r border-border h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 border-r border-border bg-background flex-col h-screen fixed left-0 top-0 z-40">
        {sidebarContent}
      </aside>
    </>
  );
}
