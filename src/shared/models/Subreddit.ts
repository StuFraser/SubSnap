export interface Subreddit {
  id: string;
  name?: string;          
  displayName: string;
  description: string | null;
  url: string;             
  relativeUrl: string;
  banner?: string | null;
  icon?: string | null;
  subscribers: number;
}