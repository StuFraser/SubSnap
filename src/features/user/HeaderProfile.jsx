import React from "react";
import { useSelector } from "react-redux";
import { selectUserProfile } from "./UserProfileSlice";

export default function HeaderProfile() {
  const { profile } = useSelector(selectUserProfile);

  if (!profile) return null; // show nothing if user not loaded

  return (
    <div className="flex items-center space-x-2">
      <img
        src={profile.avatar}
        alt={`${profile.name} avatar`}
        className="h-8 w-8 rounded-full"
      />
      <span className="hidden sm:inline text-white">{profile.name}</span>
    </div>
  );
}