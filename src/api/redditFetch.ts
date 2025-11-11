import { sessionService } from '@/shared/utils/SessionService';

export async function redditFetch(url: string, options: RequestInit = {}, retries = 3, delay = 1000): Promise<Response> {
  const token = sessionService.getToken()?.access_token;
  if (!token) throw new Error('OAuth token is required for Reddit API requests');

  options.headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);

      const remaining = response.headers.get('x-ratelimit-remaining');
      const reset = response.headers.get('x-ratelimit-reset');

      if (remaining !== null && parseFloat(remaining) < 1) {
        const waitTime = parseFloat(reset ?? '1') * 1000;
        await new Promise(res => setTimeout(res, waitTime));
        continue;
      }

      if (response.status === 401) {
        throw new Error('Unauthorized: Access token may be expired');
      }

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      return response;
    } catch (err) {
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw err;
      }
    }
  }

  throw new Error('Failed to fetch after retries');
}
