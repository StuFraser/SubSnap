import { redditFetch } from "./redditFetch";
import type { Post } from "@/shared/models/Post";

const pageSize = 25;


export async function fetchSubredditPost(subredditName: string, after: string = '', limit: number = pageSize): Promise<Post> {
    const requesturl = new URL(`https://oauth.reddit.com/r/${subredditName}/new`);
    requesturl.searchParams.append('limit', limit.toString());
    if (after) {
        requesturl.searchParams.append('after', after);
    }
    const response = await redditFetch(requesturl.toString());
    
    if (!response.ok) {
        throw new Error(`Failed to fetch subreddit Posts: ${response.status}`);
    }

    const data = await response.json();
    return {
        id: data.data.id,
        title: data.data.title,
        selfText: data.data.selftext || '',
        author: data.data.author,
        url: data.data.url,
        score: data.data.score,
        over_18: data.data.over_18,
        thumbnailUrl: data.data.thumbnail || null,
        commentCount: data.data.num_comments,
        authorAvatarUrl: data.data.author_icon_img || null,        
    };
}