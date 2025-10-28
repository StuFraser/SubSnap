import { useState, useEffect } from "react";

/**
 * A hook that returns a boolean indicating whether the window
 * is currently in a mobile layout (i.e. the width is less than
 * or equal to the given breakpoint, which defaults to 600px).
 *
 * The hook uses the `useState` and `useEffect` hooks to listen to
 * the `resize` event and update the state accordingly.
 *
 * @param {number} [breakpoint=600] The breakpoint width in pixels.
 * @returns {boolean} Whether the window is currently in a mobile layout.
 */ 

const useIsMobile = (breakpoint = 600) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
