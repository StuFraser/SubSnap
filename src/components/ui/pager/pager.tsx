import React from "react";
import ArrowLeft from "@/components/ui/icons/ArrowLeft" 
import ArrowRight from "@/components/ui/icons/ArrowRight"
import Refresh from "@/components/ui/icons/Refresh"
import Reddit from "@/components/ui/icons/Reddit";
import "./pager.css";

interface PagerProps {
  currentPage: number;
  hasNext: boolean;
  onNext: () => void;
  onPrev: () => void;
  onRefresh?: () => void;
  redditUrl?: string;
  isLoading?: boolean;
}

export const Pager: React.FC<PagerProps> = ({
  currentPage,
  hasNext,
  onNext,
  onPrev,
  onRefresh,
  redditUrl,
  isLoading = false,
}) => {
  return (
    <div className="pager">
      <button className="pager-button" onClick={onPrev} disabled={currentPage <= 1 || isLoading}>
        <ArrowLeft /> 
      </button>

      <span className="pager-index">Page {currentPage}</span>

      <button className="pager-button" onClick={onNext} disabled={!hasNext || isLoading}>
        <ArrowRight />
      </button>

      {onRefresh && (
        <button className="pager-button" onClick={onRefresh} disabled={isLoading}>
          <Refresh />
        </button>
      )}

      {redditUrl && (
        <a href={redditUrl} target="_blank" rel="noopener noreferrer" className="pager-button" >
          <Reddit />
        </a>
      )}
    </div>
  );
};
