import { useEffect, useMemo } from "react"; 
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooks";
import { fetchSubscribed, selectSubredditState } from "@/app/store/subredditsSlice";
import "./SubRedditListing.css";
import Spinner from "@/components/ui/spinner/Spinner";
import type { Subreddit } from "@/shared/models/Subreddit";

type ListMode = 'subscribed' | 'search';

interface Props {
  mode: ListMode; 
  onSelect?: (subredditName: string) => void;
  showHeader?: boolean;
}

export default function SubRedditListing({ mode, onSelect, showHeader = true }: Props) {
  const dispatch = useAppDispatch();

  const {subscribedList, subscribedStatus, subscribedError, searchResults, searchStatus, searchError } = useAppSelector(selectSubredditState);

  const { list, status, error, headerText, emptyMessage } = useMemo(() => {
    if (mode === 'subscribed') {
      return {
        list: subscribedList,
        status: subscribedStatus,
        error: subscribedError,
        headerText: "Subscribed Subreddits",
        emptyMessage: "You haven't subscribed to any subreddits yet.",
      };
    } else { 
      return {
        list: searchResults,
        status: searchStatus,
        error: searchError,
        headerText: "Search Results",
        emptyMessage: "No subreddits found for your query.",
      };
    }
  }, [
    mode, 
    subscribedList, subscribedStatus, subscribedError,
    searchResults, searchStatus, searchError
  ]);

  useEffect(() => {
    if (mode === 'subscribed' && status === "idle") {
      dispatch(fetchSubscribed());
    }
  }, [dispatch, mode, status]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "failed") {
    return (
      <div className="subreddit-list__error">
        Error loading {headerText}: {error}
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="subreddit-list__status">
        {emptyMessage}
      </div>
    );
  }

  // 4. Render the selected list
  return (
    <div className="subreddit-list">
      {showHeader && (
        <div className="subreddit-list__header">{headerText}</div>
      )}

      <ul className="subreddit-list__items">
        {list.map((sub: Subreddit) => ( // Use the generic 'list' here
          <li
            key={sub.id ?? sub.name}
            className="subreddit-list__item"
            onClick={() => sub.name && onSelect?.(sub.name)} // Use onSelect prop
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