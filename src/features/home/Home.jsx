import React from "react";
import AuthButton from "../auth/AuthButton"
import { selectIsAuthenticated } from "../auth/RedditAuthSlice"
import { useSelector } from "react-redux";
import "./home.css";

const Home = () => {

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <section className="home-page">
      <h1>Welcome to SubSnap Reddit Viewer</h1>

      {isAuthenticated ? (
        <p>You're already logged in — you're good to go!</p>
      ) : (
        <>
          <p>
            To explore your feed and interact with posts, please log in with your Reddit account.
          </p>
          <AuthButton />
        </>
      )}
      <img
        src={isAuthenticated ? "/snoo-thumbsup.png" : "/snoo-point.png"}
        alt="Status illustration"
        className="status-image"
      />
    </section>
  );
};

export default Home;