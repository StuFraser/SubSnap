import React from "react";
import { useSelector } from "react-redux";
import { selectUserProfile } from "./UserProfileSlice";
import "./UserProfile.css";

export default function UserProfile({ onClose, onLogout }) {
  const { profile, loading, error } = useSelector(selectUserProfile);

 //console.log(profile)

  // Handle edge cases
  if (loading) return <p>Loading user...</p>;
  if (error) return <p>Failed to load user info: {error}</p>;
  if (!profile) return <p>No user info available</p>;

  return (

    <div className="user-popup-overlay" onClick={onClose}>
      <div className="user-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="user-header">
          <img
            src={profile.avatar}
            alt={`${profile.name}'s avatar`}
            className="avatar-large"
          />
          <div className="user-details">
            <h2>{profile.name}</h2>
            <h3>Karma: {profile.karma ?? "No karma yet"}</h3>
          </div>
        </div>

        <p className="user-bio">{profile.bio ?? "No bio available"}</p>

        <button onClick={onLogout}>Log out</button>
      </div>
    </div>

  );
}