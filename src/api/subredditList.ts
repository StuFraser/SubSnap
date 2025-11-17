import { redditFetch } from "./redditFetch";
import type { Subreddit } from "@/shared/models/Subreddit";

async function fetchSubredditList(url: string): Promise<Subreddit[]> {
    const response = await redditFetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch subreddit listing: ${response.status}`);
    }
    const data = await response.json();
    return data.data.children.map((child: any) => ({
        id: child.data.id,
        name: child.data.display_name,
        displayName: child.data.display_name,
        description: child.data.public_description,
        url: `https://www.reddit.com${child.data.url}`,
        relativeUrl: child.data.url,
        banner: child.data.banner_img || null,
        icon: child.data.icon_img || null,
        subscribers: child.data.subscribers,
    }));
}

export async function fetchSubscribedSubreddits(): Promise<Subreddit[]> {
    return fetchSubredditList('https://oauth.reddit.com/subreddits/mine/subscriber');
}

export async function fetchSearchSubreddits(searchTerm: string): Promise<Subreddit[]> {
    return fetchSubredditList(`https://oauth.reddit.com/subreddits/search?q=${encodeURIComponent(searchTerm)}`);
}


