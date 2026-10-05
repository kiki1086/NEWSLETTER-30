export type SectionCategory =
  | 'Security Pulse'
  | 'Frontier View'
  | 'Regional Currents'
  | 'Development & Infrastructure'
  | 'Society & Youth'
  | 'Sports & Achievements';

export type NortheastState =
  | 'Arunachal Pradesh'
  | 'Assam'
  | 'Manipur'
  | 'Meghalaya'
  | 'Mizoram'
  | 'Nagaland'
  | 'Sikkim'
  | 'Tripura'
  | 'Regional';

export interface WhyThisStory {
  relevance: 'High' | 'Medium';
  reason: string;
  recencyNote: string;
  geographicRelevance: string;
  themeConnection: string;
}

export interface GeoLocation {
  name: string;
  lat: number;
  lng: number;
}

export interface Article {
  id: string;
  headline: string;
  publishedDate: string; // ISO date string (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss+05:30)
  category: SectionCategory;
  states: NortheastState[];
  summary: string; // 2-3 sentences in our own words
  sourceName: string;
  sourceUrl: string; // exact verified live link
  imageUrl: string;
  imageCredit: string;
  whyThisStory: WhyThisStory;
  district?: string;
  quote?: string; // Max 15 words
  location?: GeoLocation;
  tags?: string[];
  videoUrl?: string;
  videoTitle?: string;
}
