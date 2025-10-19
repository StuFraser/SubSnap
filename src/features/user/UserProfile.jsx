import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserProfile, fetchUserProfile } from "./UserProfileSlice";


export default function UserProfile() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(selectUserProfile);

  console.log("profile:", profile)

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p>Failed to load user info: {error}</p>;

  return (
    <section>
      <img
        src={profile?.avatar}
        alt={`${profile?.name}'s avatar`}
        width="64"
        height="64"
      />
      <h2>{profile?.name}</h2>
      <h3>Karma: {profile?.karma ? profile.karma : "No karma yet"}</h3>
    </section>
  );
}