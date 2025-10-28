import React from "react";
import { useSelector } from "react-redux";
import { selectUserProfile } from "./UserProfileSlice";
import "./userProfile.css";

/**
 * Displays the user's avatar from their profile info.
 * If the user profile has not been loaded, returns null.
 * @returns {JSX.Element} A JSX element containing the user's avatar.
 */
const HeaderProfile = () => {
  const { profile} = useSelector(selectUserProfile);

  //console.log("Profile:", profile)

  if (!profile) return null; // show nothing if user not loaded

  return (
    <div className="avatar-boarder">
        <img
          src={profile.avatar}
          alt={`${profile.name} avatar`}
          className="banner-avatar"
        />
    </div>
  );
}

export default HeaderProfile;