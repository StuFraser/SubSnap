import { describe, it, expect, beforeEach, vi } from "vitest";
import type { MockedFunction } from "vitest";
import type { Subreddit } from "@/shared/models/Subreddit";

// Mock redditFetch before importing dependent modules
vi.mock("../redditFetch", () => ({
  redditFetch: vi.fn(),
}));

import { redditFetch } from "../redditFetch";
import { fetchSubscribedSubreddits, fetchSearchSubreddits } from "../subredditList";

describe("subredditList API", () => {
  const mockSubredditData = {
    data: {
      id: "123",
      display_name: "funny",
      public_description: "A place for jokes",
      url: "/r/funny/",
      banner_img: "banner.jpg",
      icon_img: "icon.jpg",
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchSubscribedSubreddits should return mapped subreddit data", async () => {
    (redditFetch as MockedFunction<typeof redditFetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(mockSubredditData), { status: 200 })
    );

    const result = await fetchSubscribedSubreddits();

    expect(redditFetch).toHaveBeenCalledWith(
      "https://oauth.reddit.com/subreddits/mine/subscriber"
    );
    expect(result).toEqual<Subreddit>({
      id: "123",
      name: "funny",
      displayName: "funny",
      description: "A place for jokes",
      url: "https://www.reddit.com/r/funny/",
      relativeUrl: "/r/funny/",
      banner: "banner.jpg",
      icon: "icon.jpg",
    });
  });

  it("fetchSearchSubreddits should encode search term and return mapped data", async () => {
    (redditFetch as MockedFunction<typeof redditFetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(mockSubredditData), { status: 200 })
    );

    const result = await fetchSearchSubreddits("funny memes");

    expect(redditFetch).toHaveBeenCalledWith(
      "https://oauth.reddit.com/subreddits/search?q=funny%20memes"
    );
    expect(result.name).toBe("funny");
  });

  it("should throw an error when response is not ok", async () => {
    (redditFetch as MockedFunction<typeof redditFetch>).mockResolvedValueOnce(
      new Response(null, { status: 404, statusText: "Not Found" })
    );

    await expect(fetchSubscribedSubreddits()).rejects.toThrow(
      "Failed to fetch subreddit listing: 404"
    );
  });

  it("should handle missing optional fields gracefully", async () => {
    const partialData = {
      data: {
        id: "321",
        display_name: "minimal",
        public_description: "",
        url: "/r/minimal/",
      },
    };

    (redditFetch as MockedFunction<typeof redditFetch>).mockResolvedValueOnce(
      new Response(JSON.stringify(partialData), { status: 200 })
    );

    const result = await fetchSubscribedSubreddits();

    expect(result.banner).toBeNull();
    expect(result.icon).toBeNull();
  });

  it("should throw if JSON shape is invalid", async () => {
    (redditFetch as MockedFunction<typeof redditFetch>).mockResolvedValueOnce(
      new Response(JSON.stringify({}), { status: 200 })
    );

    await expect(fetchSubscribedSubreddits()).rejects.toThrow();
  });
});
