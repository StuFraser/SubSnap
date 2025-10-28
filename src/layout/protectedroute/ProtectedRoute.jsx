import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../features/auth/RedditAuthSlice"

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A wrapper component that checks if the user is authenticated
 * before rendering its children. If not authenticated, it will
 * redirect to the root path.
 * @param {React.ReactNode} children The component to render if the user is authenticated.
 * @returns {React.ReactNode} The rendered component, or the redirect to the root path if not authenticated.
 */
/*******  0588fd4e-a6d3-418d-bfb3-b3cf623ae5ae  *******/
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute
