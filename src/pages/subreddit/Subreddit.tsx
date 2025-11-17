import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { fetchPostsPage, selectPostsState, clearPosts } from "@/app/store/subredditPostSlice";
//import Pager from "@/components/ui/pager/pager";
import SubredditBanner from "@/features/subreddit/SubredditBanner";
import Postcard from "@/components/postcard/Postcard";
import Spinner from "@/components/ui/spinner/Spinner";
import "./Subreddit.css";

interface SubredditProps {
  name: string; // e.g., "reactjs"
}

const Subreddit: React.FC<SubredditProps> = ({ name }) => {
  const dispatch = useAppDispatch();
  const { posts, after, currentPage, isLoading, error } = useAppSelector(selectPostsState);
  const contentBodyRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    console.log('Scrolling...', contentBodyRef)
    if (contentBodyRef.current) {
      console.log('got the context...')
      contentBodyRef.current.scrollTop = 0;
    }
  };


  // Fetch first page on mount
  useEffect(() => {
    dispatch(fetchPostsPage({ subreddit: name, page: 1 }));
  }, [dispatch, name]);

  const handleNext = () => {
    if (!after) return;
    dispatch(clearPosts());
    dispatch(fetchPostsPage({ subreddit: name, after, page: currentPage + 1 }));
    scrollToTop();
  };

  const handlePrev = () => {
    if (currentPage <= 1) return;
    dispatch(clearPosts());
    dispatch(fetchPostsPage({ subreddit: name, page: currentPage - 1 }));
    scrollToTop();
  };

  const handleRefresh = () => {
    dispatch(clearPosts());
    dispatch(fetchPostsPage({ subreddit: name, page: 1 }));
    scrollToTop();
  }

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
          onRefresh={handleRefresh}
          redditUrl={`https://www.reddit.com/r/${name}/new`}
          isLoading={isLoading}
        />
      </div>

      {isLoading && <Spinner />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="content-body" ref={contentBodyRef}>
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
