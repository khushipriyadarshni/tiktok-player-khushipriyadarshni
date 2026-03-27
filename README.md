# 🎥 TikTok-Style Vertical Video Player

A high-fidelity, TikTok-like video feed built with React (Vite) and native HTML5 video. This project delivers a smooth, mobile-first vertical scrolling experience with auto-playing videos, interactive overlays, and a suite of bonus features for a polished, engaging user experience.

---

## 🚀 Demo

[![Video Demo](https://img.shields.io/badge/📹-Watch_Demo-FF0000?style=for-the-badge&logo=youtube)](https://bit.ly/BITSPILANIassignment_video)

**Demo Video Link:** [https://bit.ly/BITSPILANIassignment_video](https://bit.ly/BITSPILANIassignment_video)

*(Run the app locally to see the full interactive experience)*

---

## ✨ Features

### Core Features
- **Vertical Video Feed** – Full‑screen layout with CSS scroll‑snap; smooth scrolling between videos.
- **Infinite Looping** – Seamless loop from last video back to first.
- **Auto‑Play/Pause** – Video plays when it enters the viewport, pauses when leaving.
- **Tap to Play/Pause** – Tap video area toggles playback with a subtle icon overlay.
- **Progress Bar** – Thin real‑time progress bar at the bottom of each video.
- **Interactive Overlays**  
  - Right‑side action bar: Like (with heart animation), Comment, Share, Bookmark.  
  - Bottom‑left user info: username, caption (with expand option), Follow button on avatar.  
  - Rotating music disc (bottom‑right) that spins while video plays.  
  - Sound toggle button (mute/unmute).

### Bonus Features
- **Double‑Tap to Like** – Large heart animation in the center.
- **Follow Button** – Toggles between “Follow” and “Following”.
- **Long‑Press to Pause** – Hold to pause; release to resume.
- **Loading Skeleton** – Shimmer overlay while video buffers.
- **Responsive Design** – Works on mobile (375x812) and desktop.
- **Dark Mode Toggle** – Simple settings menu (gear icon) switches light/dark themes.
- **Keyboard Navigation** – Arrow Up/Down to scroll, Space to play/pause.

---

## 🛠️ Tech Stack

| Layer          | Technology                                      |
|----------------|-------------------------------------------------|
| Core Library   | React 18+ (Functional Components & Hooks)       |
| Build Tool     | Vite                                            |
| Styling        | Plain CSS (with animations in `App.css`)        |
| Video Player   | Native HTML5 `<video>` element                  |
| State Mgmt     | React Hooks (`useState`, `useEffect`, `useRef`, `useMemo`) |

---

## 🧠 Technical Approach & Key Details

### High‑Level Architecture

App
└── VideoCard (active / inactive)
├── HTML5 <video>
├── ActionBar (like, comment, share, save)
├── UserInfo (username, caption, follow button)

### Key Implementation Details

1. **Infinite Looping**  
   The feed renders `[last, ...videos, first]`. When a cloned video becomes active, the app programmatically scrolls to the matching real video, creating a seamless loop.

2. **Playback Control**  
   - `IntersectionObserver` tracks which video is most visible; only that video plays.  
   - Each `VideoCard` uses a `ref` to directly control its `<video>` element, avoiding unnecessary re‑renders.

3. **5‑8 Second Segments**  
   Each video object includes `segmentStartSec` and `segmentDurationSec`. The player seeks to the start time and loops back when the segment ends. The progress bar reflects time within that segment only.

4. **Performance Optimizations**  
   - Only one video plays at a time.  
   - State is localised (e.g., like count is managed per video component).  
   - `useMemo` prevents recalculation of processed video data.

---

## 📁 Project Structure


tiktok-player-khushipriyadarshni/
├── src/
│ ├── components/
│ │ ├── VideoCard.jsx # Main video component with overlays
│ │ ├── ActionBar.jsx # Right‑side action icons
│ │ └── UserInfo.jsx # Bottom‑left user info & follow button
│ ├── data/
│ │ └── videos.js # Video metadata (URLs, user info, segment data)
│ ├── App.jsx # Main app container with feed and settings
│ ├── App.css # Global styles and animations
│ └── main.jsx # Entry point
├── index.html
├── package.json
└── README.md

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/khushipriyadarshni/tiktok-player-khushipriyadarshni.git
cd tiktok-player-khushipriyadarshni

# Install dependencies
npm install

# Run the development server
npm run dev

Open http://localhost:5173 in your browser.

###⚙️ Configuration

No environment variables needed. All video data is configured in src/data/videos.js. You can easily add or replace videos:


// Example video object
{
  id: 1,
  url: "/videos/sample1.mp4",
  user: {
    name: "ai_learner",
    avatar: "/avatars/user1.jpg"
  },
  description: "How transformers actually work #AI #DeepLearning",
  likes: 1240,
  comments: 89,
  shares: 45,
  music: "Original Audio - ai_learner",
  segmentStartSec: 0,      // start of short clip
  segmentDurationSec: 7    // play for 7 seconds
}

###👩‍💻 Author


Khushi Priyadarshni
B.E. Artificial Intelligence & Data Science

Thank you for reviewing my project!


