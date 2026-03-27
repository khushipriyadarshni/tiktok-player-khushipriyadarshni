import { memo, useEffect, useMemo, useRef, useState } from "react";
import ActionBar from "./ActionBar";
import UserInfo from "./UserInfo";

const VideoCard = ({ video, isActive, onRequestNext }) => {
  const videoRef = useRef(null);
  const overlayTimerRef = useRef(null);
  const likeTimerRef = useRef(null);
  const longPressTimerRef = useRef(null);
  const singleTapTimerRef = useRef(null);
  const centerHeartTimerRef = useRef(null);
  const pendingActiveRef = useRef(false);

  const effectiveSegmentDurationRef = useRef(7);
  const lastTapTimeRef = useRef(0);
  const longPressTriggeredRef = useRef(false);
  const requestedNextRef = useRef(false);

  const segmentStartSec = Number.isFinite(video.segmentStartSec)
    ? video.segmentStartSec
    : 0;
  const segmentDurationSec = Number.isFinite(video.segmentDurationSec)
    ? video.segmentDurationSec
    : 7;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [isFollowing, setIsFollowing] = useState(false);

  const [showTapOverlay, setShowTapOverlay] = useState(false);
  const [tapOverlayIcon, setTapOverlayIcon] = useState("play");
  const [likeAnimating, setLikeAnimating] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);

  const [showCenterHeart, setShowCenterHeart] = useState(false);
  const [isLoading, setIsLoading] = useState(() => isActive);

  const showMoreToggle = useMemo(() => {
    const desc = video?.description ?? "";
    return desc.length > 90;
  }, [video?.description]);

  useEffect(() => {
    return () => {
      clearTimeout(overlayTimerRef.current);
      clearTimeout(likeTimerRef.current);
      clearTimeout(longPressTimerRef.current);
      clearTimeout(singleTapTimerRef.current);
      clearTimeout(centerHeartTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isActive) {
      v.muted = false;
      setIsMuted(false);
    } else {
      v.muted = true;
      setIsMuted(true);
    }
  }, [isActive]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    pendingActiveRef.current = isActive;
    setProgress(0);

    if (!isActive) {
      requestedNextRef.current = false;
      clearTimeout(longPressTimerRef.current);
      longPressTriggeredRef.current = false;
      v.pause();
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    requestedNextRef.current = false;
    try {
      if (v.readyState >= 1) v.currentTime = segmentStartSec;
    } catch {

    }

    v.play()
      .then(() => {
        // isPlaying will be set by play event listener
      })
      .catch(() => {
        // will remain paused
      });
  }, [isActive, segmentStartSec]);

  const triggerTapOverlay = (iconType) => {
    setTapOverlayIcon(iconType);
    setShowTapOverlay(true);
    clearTimeout(overlayTimerRef.current);
    overlayTimerRef.current = setTimeout(() => {
      setShowTapOverlay(false);
    }, 1000);
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play().catch(() => { });
      triggerTapOverlay("pause");
      return;
    }

    v.pause();
    triggerTapOverlay("play");
  };

  const performLikeToggle = () => {
    setLiked((prev) => {
      const next = !prev;
      setLikes((count) => count + (next ? 1 : -1));
      setLikeAnimating(true);
      clearTimeout(likeTimerRef.current);
      likeTimerRef.current = setTimeout(() => setLikeAnimating(false), 280);
      return next;
    });
  };

  const showCenterHeartPop = () => {
    setShowCenterHeart(true);
    clearTimeout(centerHeartTimerRef.current);
    centerHeartTimerRef.current = setTimeout(() => setShowCenterHeart(false), 600);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    const effectiveDuration = effectiveSegmentDurationRef.current;
    if (!Number.isFinite(effectiveDuration) || effectiveDuration <= 0) return;

    const start = segmentStartSec;
    const end = start + effectiveDuration;

    // If user scrubs before segment start, clamp back.
    if (v.currentTime < start) {
      try {
        v.currentTime = start;
      } catch {
        // ignore seek errors
      }
      setProgress(0);
      return;
    }

    // Auto-advance to next video when the active segment finishes.
    if (v.currentTime >= end) {
      if (isActive && !requestedNextRef.current) {
        requestedNextRef.current = true;
        onRequestNext?.();
      }
      return;
    }

    // Allow future auto-advance after segment re-enters normal range.
    requestedNextRef.current = false;

    const elapsed = v.currentTime - start;
    const nextProgress = (elapsed / effectiveDuration) * 100;
    if (Number.isFinite(nextProgress)) setProgress(nextProgress);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;

    const maxAvailable = Math.max(0.1, v.duration - segmentStartSec);
    effectiveSegmentDurationRef.current = Math.min(segmentDurationSec, maxAvailable);

    if (pendingActiveRef.current) {
      try {
        v.currentTime = segmentStartSec;
      } catch {
        // ignore
      }
      setProgress(0);
    }
  };

  const isFromButton = (target) =>
    Boolean(target && target.closest && target.closest("button"));

  const handlePointerDown = (e) => {
    if (!isActive) return;
    if (isFromButton(e.target)) return;

    longPressTriggeredRef.current = false;
    clearTimeout(longPressTimerRef.current);

    longPressTimerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true;
      const v = videoRef.current;
      if (!v) return;
      v.pause();
    }, 500);
  };

  const handlePointerUp = (e) => {
    if (isFromButton(e.target)) return;
    clearTimeout(longPressTimerRef.current);

    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false;
      if (!isActive) return;
      const v = videoRef.current;
      if (!v) return;
      if (v.paused) v.play().catch(() => { });
      return;
    }

    // Tap: detect double-tap like within 300ms, else single-tap play/pause.
    const now = Date.now();
    if (now - lastTapTimeRef.current < 300) {
      lastTapTimeRef.current = 0;
      clearTimeout(singleTapTimerRef.current);

      performLikeToggle();
      showCenterHeartPop();
      return;
    }

    lastTapTimeRef.current = now;
    clearTimeout(singleTapTimerRef.current);
    // Delay single-tap slightly longer than the double-tap window,
    // so a second tap cancels playback toggling.
    singleTapTimerRef.current = setTimeout(() => {
      togglePlay();
    }, 320);
  };

  const handleLikeButton = (event) => {
    event.stopPropagation();
    performLikeToggle();
  };

  return (
    <section
      className={`video-card${isActive ? " active" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {isLoading && <div className="video-skeleton" />}

      <video
        ref={videoRef}
        className="video-player"
        src={video.url}
        muted={isMuted}
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onCanPlay={() => setIsLoading(false)}
        onPlaying={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onStalled={() => setIsLoading(true)}
      />

      <div className="video-gradient" />

      <div className={`tap-overlay ${showTapOverlay ? "visible" : ""}`}>
        {tapOverlayIcon === "play" ? "▶" : "❚❚"}
      </div>

      {showCenterHeart && <div className="center-heart">❤</div>}

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <button
        className="mute-toggle"
        onClick={(event) => {
          event.stopPropagation();
          setIsMuted((prev) => !prev);
        }}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>

      <UserInfo
        user={video.user}
        description={video.description}
        music={video.music}
        expandedDescription={expandedDescription && showMoreToggle}
        showMoreToggle={showMoreToggle}
        onToggleExpandedDescription={() =>
          setExpandedDescription((prev) => !prev)
        }
        isFollowing={isFollowing}
        onToggleFollow={() => setIsFollowing((prev) => !prev)}
      />

      <ActionBar
        likes={likes}
        liked={liked}
        onToggleLike={handleLikeButton}
        likeAnimating={likeAnimating}
        comments={video.comments}
        shares={video.shares}
        saved={saved}
        onToggleSaved={(event) => {
          event.stopPropagation();
          setSaved((prev) => !prev);
        }}
      />

      <div className={`music-disc ${isPlaying && isActive ? "spinning" : ""}`}>
        <img src={video.cover} alt={`${video.user.name} track`} />
      </div>
    </section>
  );
};

export default memo(VideoCard);