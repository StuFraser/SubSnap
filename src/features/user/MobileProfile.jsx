import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserProfile } from "./UserProfileSlice";
import "./MobileProfile.css";

const MobileProfile = () => {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector(selectUserProfile);

    if (loading) return <p>Loading user...</p>;
    if (error) return <p>Failed to load user info: {error}</p>;
    if (!profile) return <p>No user info available</p>;

    if (!profile) {
        return (
            <div className="mobile-profile">
                <button className="mobile-login-btn">Login</button>
            </div>
        );
    }

    return (
        <div className="mobile-profile">
            <div className="mobile-profile-header">
                <img
                    src={profile.avatar}
                    alt={`${profile.name}'s avatar`}
                    className="mobile-profile-avatar"
                />
                <div className="mobile-profile-info">
                    <span className="mobile-profile-username">u/{profile.name}</span>
                </div>
            </div>

            <button
                className="mobile-logout-btn"
                onClick={() => dispatch(logout())}
            >
                Logout
            </button>
        </div>
    );
};

export default MobileProfile;