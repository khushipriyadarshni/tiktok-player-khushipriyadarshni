function ActionBar({
  likes,
  liked,
  onToggleLike,
  likeAnimating,
  comments,
  shares,
  saved,
  onToggleSaved,
}) {
  const likeBtnClass = `action-button like${liked ? " active" : ""}${
    likeAnimating ? " pulse" : ""
  }`;

  const sharedNoOp = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="overlay-right">
      <button className={likeBtnClass} onClick={onToggleLike}>
        <span className="action-icon">❤</span>
        <span className="action-count">{likes}</span>
      </button>

      <button className="action-button" onClick={sharedNoOp}>
        <span className="action-icon">💬</span>
        <span className="action-count">{comments}</span>
      </button>

      <button className="action-button" onClick={sharedNoOp}>
        <span className="action-icon">↗</span>
        <span className="action-count">{shares}</span>
      </button>

      <button
        className={`action-button${saved ? " active" : ""}`}
        onClick={onToggleSaved}
      >
        <span className="action-icon">🔖</span>
        <span className="action-count">Save</span>
      </button>
    </div>
  );
}

export default ActionBar;