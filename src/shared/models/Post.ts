export interface Post {
  id: string;
  title: string;
  selfText: string;
  author: string;
  url: string;
  score: number;
  over_18: boolean;
  thumbnailUrl: string | null;
  commentCount: number;
  authorAvatarUrl: string | null;
}