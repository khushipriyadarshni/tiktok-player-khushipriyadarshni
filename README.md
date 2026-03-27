# 🎥 TikTok-Style Vertical Video Player

A high-fidelity, TikTok-like video feed built with React (Vite) and native HTML5 video. This project delivers a smooth, mobile-first vertical scrolling experience with auto-playing videos, interactive overlays, and a suite of bonus features for a polished, engaging user experience.

---

## 🚀 Demo

[![Video Demo](https://img.shields.io/badge/📹-Watch_Demo-FF0000?style=for-the-badge&logo=youtube)](https://drive.google.com/file/d/1mbvV-_ll-07wa-aQlp09GrB7QoRaJ8-l/view?usp=drive_link)

**Demo Video Link:** [BITSPILANIassignment_video](https://drive.google.com/file/d/1mbvV-_ll-07wa-aQlp09GrB7QoRaJ8-l/view?usp=drive_link)

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

### Key Implementations

#### 1. Infinite Looping
- Feed renders `[last, ...videos, first]`
- Smooth seamless scrolling loop

#### 2. Playback Control
- Uses `IntersectionObserver`
- Only visible video plays
- Controlled using `ref` (no unnecessary re-renders)

#### 3. Segment Playback
- Each video uses:
  - `segmentStartSec`
  - `segmentDurationSec`
- Loops only a portion of video

#### 4. Performance Optimization
- Only one video plays at a time
- Localized state management
- `useMemo` prevents recalculations

---

## 📁 Project Structure


tiktok-player-khushipriyadarshni/
│── src/
│ ├── components/
│ │ ├── VideoCard.jsx
│ │ ├── ActionBar.jsx
│ │ └── UserInfo.jsx
│ ├── data/
│ │ └── videos.js
│ ├── App.jsx
│ ├── main.jsx
│ └── App.css
│
│── index.html
│── package.json
│── README.md

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

## ⚡ Installation & Setup

```bash
# Clone repository
git clone https://github.com/khushipriyadarshni/tiktok-player-khushipriyadarshni.git

# Navigate to project
cd tiktok-player-khushipriyadarshni

# Install dependencies
npm install

# Run project
npm run dev

Open:
[http://localhost:5173](http://localhost:5173)


---

## 👩‍💻 Author

**Khushi Priyadarshni**  
🎓 B.E. Artificial Intelligence & Data Science  

---

✨ Thank you for reviewing my project!


