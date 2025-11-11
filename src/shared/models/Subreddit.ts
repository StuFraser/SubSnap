export interface Subreddit {
  id: string;
  name?: string;           // note: you used Name vs display_name — map carefully
  displayName: string;
  description: string | null;
  url: string;             // full url
  relativeUrl: string;
  banner?: string | null;
  icon?: string | null;
}