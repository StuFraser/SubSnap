// src/components/SubRedditListing.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { fetchSubscribed, selectSubredditState } from "@/app/store/subredditsSlice";
import "./SubRedditListing.css";
import Spinner from "@/components/ui/spinner/Spinner";
import type { Subreddit } from "@/shared/models/Subreddit";

interface Props {
  onSelect?: (subredditName: string) => void;
  showHeader?: boolean;
}

export default function SubRedditListing({ onSelect, showHeader = true }: Props) {
  const dispatch = useAppDispatch();

  const {subscribedList, subscribedStatus, subscribedError} = useAppSelector(selectSubredditState)

  useEffect(() => {
    if (subscribedStatus === "idle") {
      dispatch(fetchSubscribed());
    }
  }, [dispatch, subscribedStatus]);

  if (subscribedStatus === "loading") {
    return <Spinner />;
  }

  if (subscribedStatus === "failed") {
    return (
      <div className="subreddit-list__error">
        Error loading subreddits: {subscribedError}
      </div>
    );
  }

  if (subscribedList.length === 0) {
    return (
      <div className="subreddit-list__status">
        You haven't subscribed to any subreddits yet.
      </div>
    );
  }

  return (
    <div className="subreddit-list">
      {showHeader && (
        <div className="subreddit-list__header">Subscribed Subreddits</div>
      )}

      <ul className="subreddit-list__items">
        {subscribedList.map((sub: Subreddit) => (
          <li
            key={sub.id ?? sub.name}
            className="subreddit-list__item"
            onClick={() => {}}
          >
            {sub.icon && (
              <img
                src={sub.icon}
                alt=""
                className="subreddit-list__icon"
              />
            )}
            <span className="subreddit-list__name">r/{sub.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
