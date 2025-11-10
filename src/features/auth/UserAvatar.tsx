import React from "react";
import type { User } from "@/shared/models/User";

interface Props {
  user: User;
}

const UserAvatar: React.FC<Props> = ({ user }) => {
  return (
    <div className="relative flex items-center gap-2">
      <img
        src={user.avatarUrl || "/default-avatar.png"}
        alt={user.name}
        className="w-8 h-8 rounded-full"
      />
      <span>{user.name}</span>
      {/* You could add a dropdown menu here for logout/settings */}
    </div>
  );
};

export default UserAvatar;
