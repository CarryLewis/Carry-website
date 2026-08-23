export interface UserProfile {
  id: string;
  name: string;
  email: string;
  professionalIdentity: string[];
  topics: string[];
  goals: string[];
  informationDepth: string[];
  avatar?: string;
}

export interface Source {
  id: string;
  name: string;
  type: 'rss' | 'newsletter' | 'substack' | 'twitter' | 'pubmed' | 'arxiv' | 'blog' | 'custom';
  url: string;
  category: string;
  icon?: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  source: string;
  sourceType: Source['type'];
  category: string;
  importanceScore: number;
  relevanceReason: string;
  recommendedAction: string;
  publishedAt: string;
  savedAt?: string;
  tags: string[];
  readTime: number;
  isRead: boolean;
  isSaved: boolean;
}

export interface DailyBrief {
  greeting: string;
  date: string;
  highPriority: Article[];
  stats: {
    newArticles: number;
    highPriority: number;
    savedItems: number;
    sourcesActive: number;
  };
}

export interface ResearchReport {
  id: string;
  query: string;
  generatedAt: string;
  sections: {
    title: string;
    content: string;
  }[];
  sources: string[];
}
