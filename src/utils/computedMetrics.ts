import { Article, NortheastState, SectionCategory } from '../types/article';
import { SourceItem } from '../types/source';

export function getTotalStories(articles: Article[]): number {
  return articles.length;
}

export function getTotalSources(sources: SourceItem[]): number {
  return sources.length;
}

export function getStateStoryCounts(articles: Article[]): Record<NortheastState, number> {
  const counts: Record<string, number> = {
    'Arunachal Pradesh': 0,
    'Assam': 0,
    'Manipur': 0,
    'Meghalaya': 0,
    'Mizoram': 0,
    'Nagaland': 0,
    'Sikkim': 0,
    'Tripura': 0,
    'Regional': 0
  };

  articles.forEach((a) => {
    a.states.forEach((s) => {
      if (counts[s] !== undefined) {
        counts[s]++;
      }
    });
  });

  return counts as Record<NortheastState, number>;
}

export function getCategoryCounts(articles: Article[]): Record<SectionCategory, number> {
  const counts: Record<SectionCategory, number> = {
    'Security Pulse': 0,
    'Frontier View': 0,
    'Regional Currents': 0,
    'Development & Infrastructure': 0,
    'Society & Youth': 0,
    'Sports & Achievements': 0
  };

  articles.forEach((a) => {
    if (counts[a.category] !== undefined) {
      counts[a.category]++;
    }
  });

  return counts;
}

export function getStoriesByDateMap(articles: Article[]): Map<string, Article[]> {
  const map = new Map<string, Article[]>();

  articles.forEach((a) => {
    // Extract YYYY-MM-DD
    const dateKey = a.publishedDate.split('T')[0];
    if (!map.has(dateKey)) {
      map.set(dateKey, []);
    }
    map.get(dateKey)!.push(a);
  });

  return map;
}

export function getTimelineData(articles: Article[]): Array<{ date: string; count: number; articles: Article[] }> {
  const map = getStoriesByDateMap(articles);
  const sortedDates = Array.from(map.keys()).sort();

  return sortedDates.map((date) => ({
    date,
    count: map.get(date)!.length,
    articles: map.get(date)!
  }));
}

export function getRelevanceBreakdown(articles: Article[]): { high: number; medium: number } {
  let high = 0;
  let medium = 0;

  articles.forEach((a) => {
    if (a.whyThisStory.relevance === 'High') high++;
    else medium++;
  });

  return { high, medium };
}

export function getSourceFrequencyMap(articles: Article[]): Map<string, number> {
  const freq = new Map<string, number>();

  articles.forEach((a) => {
    const s = a.sourceName;
    freq.set(s, (freq.get(s) || 0) + 1);
  });

  return freq;
}

export function getArticlesByState(articles: Article[], state: NortheastState): Article[] {
  return articles.filter((a) => a.states.includes(state));
}

export function getArticlesByCategory(articles: Article[], category: SectionCategory): Article[] {
  return articles.filter((a) => a.category === category);
}

export function formatISODate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return iso.split('T')[0];
  }
}
