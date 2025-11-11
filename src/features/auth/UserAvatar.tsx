import React, { useState, useRef, useEffect } from "react";
import type { User } from "@/shared/models/User";
import "./UserAvatar.css";

interface Props {
  user: User;
  onLogout: () => void;
}

const UserAvatar: React.FC<Props> = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="user-badge" ref={dropdownRef}>
      <div className="user-name">{user.username}</div>
      <div className="avatar" onClick={() => setOpen((prev) => !prev)}>
        <img src={user.avatarUrl || "/default-avatar.png"} alt={user.username} />
      </div>

      {open && (
        <div className="user-dropdown">
          <div className="user-info">
            <img
              src={user.avatarUrl || "/default-avatar.png"}
              alt={user.username}
            />
            <div>
              <div className="user-name">{user.username}</div>
              <div className="user-karma">{user.karma} karma</div>
            </div>
          </div>
          <div className="user-bio">{user.bio}</div>
          <hr />
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
