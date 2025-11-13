import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsPage, selectPostsState, clearPosts } from "@/app/store/subredditPostSlice";
import type { AppDispatch } from "@/app/store";
//import Pager from "@/components/ui/pager/pager";
import SubredditBanner from "@/features/subreddit/SubredditBanner";
import Postcard from "@/components/postcard/Postcard";
import "./Subreddit.css";

interface SubredditProps {
  name: string; // e.g., "reactjs"
}

const Subreddit: React.FC<SubredditProps> = ({ name }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, after, currentPage, isLoading, error } = useSelector(selectPostsState);

  // Fetch first page on mount
  useEffect(() => {
    dispatch(fetchPostsPage({ subreddit: name, page: 1 }));
  }, [dispatch, name]);



  const handleNext = () => {
    if (!after) return;
    dispatch(fetchPostsPage({ subreddit: name, after, page: currentPage + 1 }));
  };

  const handlePrev = () => {
    if (currentPage <= 1) return;
    // Resetting 'after' to undefined for previous page; slice fetches fresh
    dispatch(fetchPostsPage({ subreddit: name, page: currentPage - 1 }));
  };

  return (
    <div className="subreddit-page">
      <div className="subreddit-header">
        <SubredditBanner
          name={name}
          title={`r/${name} - New Posts`}
          currentPage={currentPage}
          hasNext={!!after}
          onNext={handleNext}
          onPrev={handlePrev}
          onRefresh={() => {
            dispatch(clearPosts());
            dispatch(fetchPostsPage({ subreddit: name, page: 1 }));
          }}
          redditUrl={`https://www.reddit.com/r/${name}/new`}
          isLoading={isLoading}
        />
      </div>

      {isLoading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="content-scroll">
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Postcard post={post} />
            </li>
          ))}
        </ul>
      </div>

    </div>

  );
};

export default Subreddit;
