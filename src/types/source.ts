export interface SourceItem {
  id: string;
  name: string;
  domain: string;
  category: 'National Daily' | 'Regional Daily' | 'Digital Network' | 'Official Gazette' | 'Policy Portal' | 'Defense Journal';
  location: string;
  url: string;
  articleCount?: number; // Computed dynamically
  description: string;
}
