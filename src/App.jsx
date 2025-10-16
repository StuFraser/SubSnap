import { useState } from 'react'
import './App.css'
import { getSubRedditPosts } from "./reddit/redditApi.js"


function App() {

  const testFetch = async () => {
    const posts = await getSubRedditPosts("javascript");
    console.log(posts);
  }

  testFetch();


  return (
    <>
      <h1> Subsnap</h1>
    </>
  )
}

export default App
