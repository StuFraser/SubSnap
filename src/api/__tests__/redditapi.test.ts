import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCurrentUser } from '../redditapi';
import * as redditFetchModule from '../redditFetch';
import { sessionService } from '../../shared/utils/SessionService';

// Mock redditFetch
vi.mock('../redditFetch', () => ({
  redditFetch: vi.fn(),
}));

// Mock sessionService
vi.mock('../../shared/utils/SessionService', () => ({
  sessionService: {
    getToken: vi.fn(),
  },
}));

describe('fetchCurrentUser', () => {
  const mockUserData = {
    id: 'abc123',
    name: 'testuser',
    icon_img: 'https://avatar.url',
    total_karma: 1000,
    subreddit: { public_description: 'Test bio' },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws if token is invalid/expired', async () => {
    (sessionService.getToken as any).mockReturnValue({
      access_token: 'invalid-token',
    });

    (redditFetchModule.redditFetch as any).mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Unauthorized' }),
    });

    await expect(fetchCurrentUser()).rejects.toThrow(
      "Failed to fetch current user: 401"
    );
  });

  it('returns user if token is valid', async () => {
    (sessionService.getToken as any).mockReturnValue({
      access_token: 'valid-token',
    });

    (redditFetchModule.redditFetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockUserData,
    });

    const user = await fetchCurrentUser();

    expect(user).toEqual({
      id: 'abc123',
      username: 'testuser',
      avatarUrl: 'https://avatar.url',
      bio: 'Test bio',
      karma: 1000,
    });
  });
});
