import React from "react";

const ArrowLeft: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    {...props}
  >
    <path d="M17.45,2.11a1,1,0,0,0-1.05.09l-12,9a1,1,0,0,0,0,1.6l12,9a1,1,0,0,0,1.05.09A1,1,0,0,0,18,21V3A1,1,0,0,0,17.45,2.11Z" />
  </svg>
);

export default ArrowLeft;
