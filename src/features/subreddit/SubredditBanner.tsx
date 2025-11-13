import React from 'react';
import Pager from '@/components/ui/pager/pager';
import './SubredditBanner.css';

interface SubredditBannerProps {
    name: string;
    title?: string;
    currentPage: number;
    hasNext: boolean;
    onNext: () => void;
    onPrev: () => void;
    onRefresh?: () => void;
    redditUrl?: string;
    isLoading?: boolean;
}

const SubredditBanner: React.FC<SubredditBannerProps> = ({
    name,
    title,
    currentPage,
    hasNext,
    onNext,
    onPrev,
    onRefresh,
    redditUrl,
    isLoading,
}) => {
    return (
        <div className="subreddit-banner">
            <div className="subreddit-title">
                <h2> {title || `r/${name}`}</h2>
            </div>
            <div className='pager-container'>

                <Pager
                    currentPage={currentPage}
                    hasNext={hasNext}
                    onNext={onNext}
                    onPrev={onPrev}
                    onRefresh={onRefresh}
                    redditUrl={redditUrl}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default SubredditBanner;
