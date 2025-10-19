import { getByTitle } from "@testing-library/react";
import { store } from "../store/store";


const basePageSize = 25;

// Going to park this, the rate limits on the json api are to restrictive;

/*  Useful endpoints:

Endpoint                                  |  Description
----------------------------------------------------------------------------
/r/{subreddit}/.json                      |  Get posts from a subreddit
/r/{subreddit}/hot/.json                  |  Hot posts
/r/{subreddit}/new/.json                  |  New posts
/r/{subreddit}/top/.json?t=dayTop         |  posts by time
/r/{subreddit}/comments/{post_id}/.json   |  Comments on a post
/user/{username}/.json                    |  Public user activity
/search.json?q=keyword                    |  Search Reddit
/comments/{post_id}.json                  |  Shortcut to post + comments

*/

/**
 * @deprecated Use functions from redditOfficialApi.js instead.
 */

//Base request handler with retry mechanic
const apiFetch = async (url, options = {}, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {

            const token = selectAuthToken(store.getState());
            if (!token) throw new Error("No auth token found in store");

            console.log("Making Request: ", url);
            const response = await fetch(url, options);

            //api rate limit checks
            // will need a fluffing to handle limit exceptions
            const remaining = response.headers.get('x-ratelimit-remaining');
            const reset = response.headers.get('x-ratelimit-reset');
            console.log(`Requests remaining: ${remaining}.  Reset: ${reset}`);

            if (remaining !== null && parseFloat(remaining) < 1) {
                const waitTime = (parseFloat(reset) || 1) * 1000;
                console.warn(`Rate limit reached. Waiting ${waitTime}ms before retrying...`);
                await new Promise(res => setTimeout(res, waitTime));
                continue; // Retry after waiting
            }

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response;
        } catch (err) {
            if (i < retries - 1) await new Promise(res => setTimeout(res, delay));
            else {
                console.log('fetch Error:', err);
                throw err
            };
        }
    };
};

// Return an array of posts for the sub redit
export const getSubRedditPosts = async (subReddit, limit = basePageSize, after = null) => {
    const requestUrl = new URL(`${baseUrl}/r/${subReddit}/.json`);
    requestUrl.searchParams.append('limit', limit);
    if (after) {
        requestUrl.searchParams.append('after', after);
    }


    const response = await apiFetch(requestUrl);
    //console.log("FetchReponse: ", response);
    const responseData = response.json();
    console.log("Json: ", responseData)

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

export const getUserProfile = async () => {
    const url = new URL("/api/v1/me", baseUrl);
    const response = await apiFetch(url);

    const responseData = await response.json();
    console.log(responseData);
};


