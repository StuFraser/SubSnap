
const REDDIT_SCOPES = import.meta.env.VITE_REDDIT_DATA_URI
const baseUrl = "https:/oauth.reddit.com";

/**
 * apiFetch - Fetch wrapper for Reddit API with retries and rate-limit handling
 * @param {string} url - The API endpoint
 * @param {object} options - Fetch options
 * @param {number} retries - Number of retries
 * @param {number} delay - Delay between retries in ms
 */
const apiFetch = async (token, url, options = {}, retries = 3, delay = 1000) => {

    if (!token) throw new Error("OAuth token is required for Reddit API requests");

    // Add Authorization header
    options.headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
    };

    for (let i = 0; i < retries; i++) {
        try {
            //console.log("Making Request:", url);
            const response = await fetch(url, options);

            // Handle Reddit API rate-limiting
            const remaining = response.headers.get('x-ratelimit-remaining');
            const reset = response.headers.get('x-ratelimit-reset');

            if (remaining !== null && parseFloat(remaining) < 1) {
                const waitTime = (parseFloat(reset) || 1) * 1000;
                console.warn(`Rate limit reached. Waiting ${waitTime}ms before retrying...`);
                await new Promise(res => setTimeout(res, waitTime));
                continue; // Retry after waiting
            }

            // If unauthorized, token may have expired
            if (response.status === 401) {
                console.warn("Token expired or invalid. You may need to refresh or re-authenticate.");
                // Optionally: trigger token refresh logic here
                throw new Error("Unauthorized: Access token may be expired");
            }

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            return response;
        } catch (err) {
            if (i < retries - 1) {
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(res => setTimeout(res, delay));
            } else {
                console.error("fetch Error:", err);
                throw err;
            }
        }
    }
};

export const getSubRedditPosts = async (token, subReddit, limit = basePageSize, after = null) => {
    const requestUrl = new URL(`${baseUrl}/r/${subReddit}/.json`);
    requestUrl.searchParams.append('limit', limit);
    if (after) {
        requestUrl.searchParams.append('after', after);
    }


    const response = await apiFetch(token, requestUrl);
    //console.log("FetchReponse: ", response);
    const responseData = response.json();
    //console.log("Json: ", responseData)

    const posts = responseData.data.children.map(p => ({
        id: p.data.id,
        title: p.data.title,
        selfText: p.data.selfText,
        author: p.data.author,
        url: p.data.url,
        score: p.data.score,
        over_18: p.data.over_18,
        commentCount: p.data.commentCount,
    }));

    return {
        posts,
        nextPage: responseData.after,
        prevPage: responseData.before
    }
};

export const getUserProfile = async (token) => {
    const url = new URL("/api/v1/me", baseUrl);
    const response = await apiFetch(token, url);
    const responseData = await response.json();
    //console.log(responseData); 
    //console.log(responseData.subreddit);

    const userData = {
        id: responseData.id,
        name: responseData.name,
        avatar: responseData.avatar || responseData.icon_img,
        karma: responseData.karma,
        bio: responseData.subreddit.public_description
    }

    console.log("user data:", userData);

    return userData;
};
