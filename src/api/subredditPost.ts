import { redditFetch } from "./redditFetch";
import type { Post } from "@/shared/models/Post";
import { getValidThumbnail } from "./helpers/apiHelpers";

const pageSize = 25;

export interface FetchSubredditPostResponse {
  posts: Post[];
  after: string | null;
}

export const fetchSubredditPost = async (
  subredditName: string,
  after: string = "",
  limit: number = pageSize
): Promise<FetchSubredditPostResponse> => {
  const requestUrl = new URL(`https://oauth.reddit.com/r/${subredditName}/new`);
  requestUrl.searchParams.append("limit", limit.toString());
  if (after) {
    requestUrl.searchParams.append("after", after);
  }

  const response = await redditFetch(requestUrl.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch subreddit posts: ${response.status}`);
  }

  const data = await response.json();

  const posts: Post[] = data.data.children.map((child: any) => ({
    id: child.data.name, // use the Reddit "fullname" (t3_xxxxx) for paging
    title: child.data.title,
    selfText: child.data.selftext || "",
    author: child.data.author,
    url: child.data.url,
    score: child.data.score,
    over_18: child.data.over_18,
    thumbnailUrl: getValidThumbnail(child.data.thumbnail),
    commentCount: child.data.num_comments,
    authorAvatarUrl: child.data.snoovatar_img || null,
  }));

  return {
    posts,
    after: data.data.after, // carry forward the Reddit pagination token
  };
};
