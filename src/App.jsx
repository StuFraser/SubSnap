import { useState } from 'react'
import './App.css'
//import { getSubRedditPosts } from "./reddit/redditJsonApi.js"
import {  redirectToRedditAuth, parseRedditAccessToken,redditFetch } from "./reddit/redditOAuth";
import RedditPosts from "./components/TestComponent";
import AuthButton from "./reddit/RedditLogin"

function App() {

  const testFetch = async () => {
    //const posts = await getSubRedditPosts("javascript");
    //console.log(posts);

redirectToRedditAuth();

    const token = parseRedditAccessToken();
    console.log("token: ", token);
    const data = await redditFetch("/r/reactjs/hot", token);

    console.log(data);

  }

 // testFetch();


  return (
    <>
      <h1> Subsnap</h1>
       <AuthButton />
      <RedditPosts subreddit="javascript" limit={10} />
    </>
  )
}

export default App
