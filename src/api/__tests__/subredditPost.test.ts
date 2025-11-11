import { describe, it, expect, beforeEach, vi } from "vitest";
import type { MockedFunction } from "vitest";
import type { Post } from "@/shared/models/Post";

// Mock redditFetch before importing modules that depend on it
vi.mock("../redditFetch", () => ({
  redditFetch: vi.fn(),
}));

import { redditFetch } from "../redditFetch";
import { fetchSubredditPost } from "../subredditPost";

describe("fetchSubredditPost", () => {
  const mockPostData = {
    data: {
      id: "abc123",
      title: "Test Post",
      selftext: "This is a post body",
      author: "redditUser",
      url: "https://www.reddit.com/r/funny/comments/abc123/test_post/",
      score: 42,
      over_18: false,
      thumbnail: "https://example.com/thumb.jpg",
      num_comments: 10,
      author_icon_img: "https://example.com/avatar.jpg",
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch posts and return mapped data", async () => {
    (redditFetch as MockedFunction<typeof redditFetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(mockPostData), { status: 200 })
    );

    const result = await fetchSubredditPost("funny");

    expect(redditFetch).toHaveBeenCalledWith(
      expect.stringContaining("https://oauth.reddit.com/r/funny/new")
    );

    expect(result).toEqual<Post>({
      id: "abc123",
      title: "Test Post",
      selfText: "This is a post body",
      author: "redditUser",
      url: "https://www.reddit.com/r/funny/comments/abc123/test_post/",
      score: 42,
      over_18: false,
      thumbnailUrl: "https://example.com/thumb.jpg",
      commentCount: 10,
      authorAvatarUrl: "https://example.com/avatar.jpg",
    });
  });

  it("should include 'after' parameter when provided", async () => {
    (redditFetch as MockedFunction<typeof redditFetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(mockPostData), { status: 200 })
    );

    await fetchSubredditPost("funny", "t3_abc123");

    expect(redditFetch).toHaveBeenCalledWith(
      expect.stringContaining("after=t3_abc123")
    );
  });

  it("should throw an error when response is not ok", async () => {
    (redditFetch as MockedFunction<typeof redditFetch>).mockResolvedValueOnce(
      new Response(null, { status: 404, statusText: "Not Found" })
    );

    await expect(fetchSubredditPost("funny")).rejects.toThrow(
      "Failed to fetch subreddit Posts: 404"
    );
  });

  it("should handle missing optional fields gracefully", async () => {
    const partialData = {
      data: {
        id: "def456",
        title: "Partial Post",
        selftext: "",
        author: "anotherUser",
        url: "https://www.reddit.com/r/funny/comments/def456/partial_post/",
        score: 0,
        over_18: false,
        num_comments: 0,
      },
    };

    (redditFetch as MockedFunction<typeof redditFetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(partialData), { status: 200 })
    );

    const result = await fetchSubredditPost("funny");

    expect(result.thumbnailUrl).toBeNull();
    expect(result.authorAvatarUrl).toBeNull();
    expect(result.selfText).toBe(""); // default value
  });

  it("should throw if JSON shape is invalid", async () => {
    (redditFetch as MockedFunction<typeof redditFetch>).mockResolvedValueOnce(
      new Response(JSON.stringify({}), { status: 200 })
    );

    await expect(fetchSubredditPost("funny")).rejects.toThrow();
  });
});
