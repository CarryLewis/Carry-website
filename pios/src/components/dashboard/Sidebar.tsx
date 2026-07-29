'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Radio, LayoutDashboard, Newspaper, Search, Database,
  Settings, User, LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Brief', icon: LayoutDashboard },
  { href: '/dashboard/feed', label: 'Feed', icon: Newspaper },
  { href: '/research', label: 'Research', icon: Search },
  { href: '/knowledge', label: 'Knowledge', icon: Database },
];

const bottomItems = [
  { href: '/onboarding', label: 'Profile', icon: User },
  { href: '#', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 border-r border-border bg-background flex flex-col h-screen fixed left-0 top-0 z-40">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-border">
        <Radio className="w-5 h-5 text-accent" />
        <span className="font-semibold tracking-tight">PIOS</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-accent-soft text-accent font-medium'
                  : 'text-muted hover:text-foreground hover:bg-card'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-card transition-colors"
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-danger transition-colors w-full">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
