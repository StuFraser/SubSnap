import React from "react";
import { useSelector } from "react-redux";
import { selectUserProfile } from "./UserProfileSlice";
import "./userProfile.css";


export default function HeaderProfile() {
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