import { redditFetch } from "./redditFetch";
import type { Subreddit } from "@/shared/models/Subreddit";

async function fetchSubredditList(url: string): Promise<Subreddit> {
    const response = await redditFetch(url);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch subreddit listing: ${response.status}`);
    }
    const data = await response.json();
    return {
        id: data.data.id,
        name: data.data.display_name,
        displayName: data.data.display_name,
        description: data.data.public_description,
        url: `https://www.reddit.com${data.data.url}`,
        relativeUrl: data.data.url,
        banner: data.data.banner_img || null,
        icon: data.data.icon_img || null,
    };
}

export async function fetchSubscribedSubreddits() : Promise<Subreddit>  {
    return fetchSubredditList('https://oauth.reddit.com/subreddits/mine/subscriber');
}

export async function fetchSearchSubreddits(searchTerm: string) : Promise<Subreddit>  {
    return fetchSubredditList(`https://oauth.reddit.com/subreddits/search?q=${encodeURIComponent(searchTerm)}`);
}


