import { useMemo } from "react";

function UserInfo({
  user,
  description,
  music,
  expandedDescription,
  showMoreToggle,
  onToggleExpandedDescription,
  isFollowing,
  onToggleFollow,
}) {
  const username = useMemo(() => `@${user?.name ?? "unknown"}`, [user?.name]);

  return (
    <div className="overlay-left">
      <div className="user-row">
        <button
          className={`avatar-follow-btn${isFollowing ? " following" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            onToggleFollow?.();
          }}
          aria-label="Follow toggle"
        >
          <img
            className="user-avatar"
            src={user?.avatar}
            alt={`${user?.name ?? "user"} avatar`}
          />
        </button>
        <p className="username">{username}</p>
        <span className="follow-status">
          {isFollowing ? "Following" : "Follow"}
        </span>
      </div>

      <p className={`caption${expandedDescription ? " expanded" : ""}`}>
        {description}
      </p>

      {showMoreToggle && (
        <button
          className="more-button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleExpandedDescription?.();
          }}
        >
          {expandedDescription ? "less" : "more"}
        </button>
      )}

      <p className="music-label">♪ {music ?? ""}</p>
    </div>
  );
}

export default UserInfo;