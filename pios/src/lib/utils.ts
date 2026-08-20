export function relativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function scoreColor(score: number): string {
  if (score >= 90) return 'text-danger bg-danger/10 border-danger/20';
  if (score >= 75) return 'text-warning bg-warning/10 border-warning/20';
  return 'text-accent bg-accent/10 border-accent/20';
}

export function sourceTypeLabel(type: string): string {
  const map: Record<string, string> = {
    rss: 'RSS',
    newsletter: 'Newsletter',
    substack: 'Substack',
    twitter: 'X / Twitter',
    pubmed: 'PubMed',
    arxiv: 'arXiv',
    blog: 'Blog',
    custom: 'Custom',
  };
  return map[type] || type;
}
