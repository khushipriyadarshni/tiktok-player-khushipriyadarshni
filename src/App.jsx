import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { videos } from "./data/videos";
import VideoCard from "./components/VideoCard";

function App() {
  const feedRef = useRef(null);
  const resetScrollRef = useRef(false);
  const [currentRenderIndex, setCurrentRenderIndex] = useState(1);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
    return prefersLight ? "light" : "dark";
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const feedVideos = useMemo(
    () => [videos[videos.length - 1], ...videos, videos[0]],
    []
  );

  useEffect(() => {
    if (!feedRef.current) return;
    feedRef.current.scrollTop = window.innerHeight;
  }, []);

  useEffect(() => {
    let timerId;
    const onResize = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        if (!feedRef.current) return;
        feedRef.current.scrollTop = currentRenderIndex * window.innerHeight;
      }, 60);
    };

    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timerId);
      window.removeEventListener("resize", onResize);
    };
  }, [currentRenderIndex]);

  const handleScroll = () => {
    if (!feedRef.current || resetScrollRef.current) return;

    const viewHeight = window.innerHeight;
    const rawIndex = Math.round(feedRef.current.scrollTop / viewHeight);
    const boundedIndex = Math.max(0, Math.min(rawIndex, feedVideos.length - 1));
    setCurrentRenderIndex(boundedIndex);

    if (boundedIndex === 0) {
      resetScrollRef.current = true;
      const newIndex = videos.length;
      setCurrentRenderIndex(newIndex);
      feedRef.current.scrollTo({ top: newIndex * viewHeight, behavior: "auto" });
      requestAnimationFrame(() => {
        resetScrollRef.current = false;
      });
      return;
    }

    if (boundedIndex === feedVideos.length - 1) {
      resetScrollRef.current = true;
      const newIndex = 1;
      setCurrentRenderIndex(newIndex);
      feedRef.current.scrollTo({ top: newIndex * viewHeight, behavior: "auto" });
      requestAnimationFrame(() => {
        resetScrollRef.current = false;
      });
    }
  };

  const getWrappedRenderIndex = (targetIndex) => {
    const total = feedVideos.length;
    let next = targetIndex;
    if (next < 0) next = 0;
    if (next > total - 1) next = total - 1;
    if (next === 0) next = videos.length;
    if (next === total - 1) next = 1;
    return next;
  };

  const goToRenderIndex = (targetIndex) => {
    if (!feedRef.current) return;
    const viewHeight = window.innerHeight;

    resetScrollRef.current = true;
    setCurrentRenderIndex(targetIndex);
    feedRef.current.scrollTo({ top: targetIndex * viewHeight, behavior: "auto" });
    requestAnimationFrame(() => {
      resetScrollRef.current = false;
    });
  };

  const goToNextVideo = () => {
    const next = getWrappedRenderIndex(currentRenderIndex + 1);
    goToRenderIndex(next);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      const target = e.target;
      if (target && target.closest && target.closest("button")) return;

      if (e.code === "ArrowDown") {
        e.preventDefault();
        const next = getWrappedRenderIndex(currentRenderIndex + 1);
        goToRenderIndex(next);
      }

      if (e.code === "ArrowUp") {
        e.preventDefault();
        const prev = getWrappedRenderIndex(currentRenderIndex - 1);
        goToRenderIndex(prev);
      }

      if (e.code === "Space") {
        // Toggle play/pause for active video
        e.preventDefault();
        const v = feedRef.current?.querySelector(".video-card.active video");
        if (!v) return;
        if (v.paused) v.play().catch(() => {});
        else v.pause();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentRenderIndex, feedVideos.length]);

  return (
    <div className={`app-root theme-${theme}`}>
      <button
        className="settings-btn"
        onClick={() => setSettingsOpen((prev) => !prev)}
        aria-label="Settings"
      >
        ⚙
      </button>

      {settingsOpen && (
        <div className="settings-menu" role="menu" aria-label="Theme settings">
          <button
            className={theme === "dark" ? "active" : ""}
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
          <button
            className={theme === "light" ? "active" : ""}
            onClick={() => setTheme("light")}
          >
            Light
          </button>
          <button onClick={() => setSettingsOpen(false)}>Close</button>
        </div>
      )}

      <div ref={feedRef} className="feed" onScroll={handleScroll}>
        {feedVideos.map((video, renderIndex) => (
          <VideoCard
            key={`${video.id}-${renderIndex}`}
            video={video}
            isActive={renderIndex === currentRenderIndex}
            onRequestNext={goToNextVideo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;