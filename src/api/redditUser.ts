import type { User } from '@/shared/models/User';
import { redditFetch } from './redditFetch';


export const fetchCurrentUser = async (): Promise<User> => {
  const response = await redditFetch('https://oauth.reddit.com/api/v1/me');

  if (!response.ok) {
    throw new Error(`Failed to fetch current user: ${response.status}`);
  }

  const data = await response.json();

  return {
    id: data.id,
    username: data.name,
    avatarUrl: data.icon_img || null,
    bio: data.subreddit?.public_description || null,
    karma: data.total_karma,
  };
}
