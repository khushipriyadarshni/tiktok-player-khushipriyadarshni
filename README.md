# 🎥 TikTok-Style Vertical Video Player (React + Vite)

A high-fidelity, TikTok-like video feed built with React and native HTML5 video. This project delivers a smooth, mobile-first vertical scrolling experience with auto-playing videos, interactive overlays, and a suite of bonus features for a polished, engaging user experience.

## Project Overview

This application simulates the core experience of short-form video platforms. The primary goal is to create a performant, user-friendly interface where videos auto-play as they come into view, pause when scrolled away, and respond to user interactions like taps, double-taps, and long presses.

**This project demonstrates:**
- **Smooth Feed Navigation**: Vertical scroll snapping with infinite looping.
- **Intelligent Video Playback**: Automatic play/pause based on viewport visibility.
- **Rich User Interaction**: Like, comment, share, save, follow, and sound controls.
- **Performance Focus**: Only the visible video plays, ensuring efficient resource use.
- **Polished UX**: Visual feedback for all actions (heart animations, loading skeletons, progress bars).

### Problem Statement & Solution

| Challenge | Our Solution |
|-----------|--------------|
| **Managing Multiple Video Players** | Using `IntersectionObserver` to precisely control which video is active, ensuring only one plays at a time. |
| **Smooth Infinite Scrolling** | Implementing a cloned-boundary technique with programmatic scroll jumps to create a seamless looping feed. |
| **Playback Control & Feedback** | Native `<video>` element with custom controls for tap-to-play/pause, progress bar, and sound toggle. |
| **Rich UI Interactions** | Lightweight state management for interactive overlays with instant visual feedback (animations, counters). |

---

## Demo Link

### 🎬 Video Demo
[![Video Demo](https://bit.ly/BITSPILANIassignment_video)





---

## Core Features Implemented

### 1. Vertical Video Feed
- **Full-Screen Layout**: Each video occupies the full viewport height.
- **Smooth Navigation**: Uses CSS `scroll-snap-type: y mandatory` for precise, snap-based scrolling.
- **Infinite Looping**: Seamlessly loops from the last video back to the first using a clone-based approach.
- **Multiple Videos**: Supports a minimum of 5 sample video clips.

### 2. Video Playback
- **Auto-Play/Pause**: The video in view auto-plays; all others are paused.
- **Tap to Play/Pause**: Tapping the video area toggles playback.
- **Visual Feedback**: A subtle play/pause icon fades in/out on tap.
- **Progress Bar**: A thin, real-time progress bar at the bottom of each video.

### 3. Interactive Overlays
- **Right-Side Action Bar**: Buttons for Like (with heart animation), Comment, Share, and Bookmark.
- **User Info Overlay**: Username, caption (with "more" expand option), and a Follow button on the avatar.
- **Music Disc**: A circular thumbnail that rotates while the video plays.
- **Sound Toggle**: A button to mute/unmute the video audio.

## Bonus Features Implemented

- **Double-Tap to Like**: A large heart animation appears in the center when double-tapping the video.
- **Follow Button**: Toggles between "Follow" and "Following" states on the user avatar.
- **Long-Press to Pause**: Holding down on the video pauses it; releasing resumes playback.
- **Loading Skeleton**: A shimmer overlay is displayed while the active video buffers.
- **Responsive Design**: Fully functional on both mobile (375x812) and desktop viewports.
- **Dark Mode Toggle**: A simple settings menu (gear icon) allows users to switch between light and dark themes.
- **Keyboard Navigation**: Arrow Up/Down to scroll, Spacebar to play/pause the active video.

---

## Technical Approach & System Design

### High-Level Architecture

The application is built with a component-based architecture in React, focusing on separation of concerns and performance.

```mermaid
graph TD
    App --> Feed[VideoFeed Container]
    Feed --> VideoCard[VideoCard Component]
    VideoCard --> Video[HTML5 Video Element]
    VideoCard --> Overlays[Overlay Components]
    
    subgraph State & Logic
        ActiveVideo[Active Video Index]
        PlayState[Play/Pause State]
        UserData[Like/Comment/Save State]
    end
    
    subgraph Interaction Handlers
        Scroll[Scroll/Keyboard Handler]
        Intersection[Intersection Observer]
        Tap[Tap/Double-tap/Long-press]
    end
    
    ActiveVideo --> VideoCard
    Scroll --> ActiveVideo
    Intersection --> ActiveVideo
    Tap --> PlayState
    Tap --> UserData
Key Implementation Details
1. Infinite Looping Mechanism
The feed loops by rendering an array of [last, ...videos, first]. When the user scrolls to a cloned video, a useEffect hook detects the change and programmatically scrolls the user to the corresponding real video index, creating a seamless loop.

2. Video Playback Control
IntersectionObserver: A single observer is used to track which VideoCard is most visible within the viewport. Only the video with the highest intersection ratio is set as the activeVideo.

useRef for Video Elements: Each VideoCard maintains a ref to its <video> element, allowing for direct control (.play(), .pause(), .currentTime) without causing unnecessary re-renders.

3. Custom 5-8 Second Video Segments
To simulate short-form content, each video object in src/data/videos.js includes segmentStartSec and segmentDurationSec. The player seeks to the start time and loops back when the segment duration is reached. The progress bar reflects time elapsed within this specific segment, not the full video.

4. Performance Optimizations
Single Active Player: The activeVideo state ensures that only one video's .play() method is ever called.

Efficient Re-renders: State is localized where possible. For example, the like count for a video is managed within its own VideoCard component to prevent the entire feed from re-rendering when a single video is liked.

useMemo for Data: The processed video data array is memoized to prevent unnecessary recalculations.

Tech Stack
Layer	Technology
Core Library	React 18+ (Functional Components & Hooks)
Build Tool	Vite
Styling	Plain CSS (with animations in src/App.css)
Video Player	Native HTML5 <video> element
State Management	React Hooks (useState, useEffect, useRef, useMemo)
Quick Start
Prerequisites
Node.js (v16 or later)

npm or yarn

Installation
bash

Copy

Download
# Clone the repository
git clone https://github.com/khushipriyadarshni/tiktok-player-khushipriyadarshni
cd tiktok-player-yourname

# Install dependencies
npm install

# Run the development server
npm run dev
Open http://localhost:5173 in your browser.

Project Structure
text

Copy

Download
tiktok-player-khushipriyadarshni/
├── src/
│   ├── components/
│   │   ├── VideoCard.jsx       # Main video component with overlays
│   │   ├── ActionBar.jsx       # Right-side action icons (like, comment, etc.)
│   │   ├── UserInfo.jsx        # Bottom-left user info and follow button
│   │   
│   ├── data/
│   │   └── videos.js           # Video metadata (URLs, user info, segment data)
│   ├── App.jsx                 # Main app container with feed and settings
│   ├── App.css                 # Global styles and animations
│   └── main.jsx                # Application entry point
├── index.html
├── package.json
└── README.md
Configuration & Environment
No external environment variables are required. All video data is configured in src/data/videos.js. You can easily add or replace videos by updating this file.

javascript

Copy

Download
// Example video data structure
const videos = [
  {
    id: 1,
    url: "/videos/sample1.mp4",
    user: { name: "ai_learner", avatar: "/avatars/user1.jpg" },
    description: "How transformers actually work #AI #DeepLearning",
    likes: 1240,
    comments: 89,
    shares: 45,
    music: "Original Audio - ai_learner",
    segmentStartSec: 0,   // For short looping
    segmentDurationSec: 7 // e.g., play for 7 seconds
  },
  // ... more videos
];
Key Challenges & Solutions
Challenge	Solution
Smooth Infinite Loop Without Jank	Implemented a cloned-boundary technique with a scrollTo programmatic jump that is imperceptible to the user.
Managing Video Buffering State	Used the waiting and canplay events on the <video> element to toggle the loading skeleton.
Precise Segment Looping	Attached a timeupdate event listener that checks if currentTime exceeds segmentStartSec + segmentDurationSec and resets it.
Simultaneous Gestures (Tap/Double-Tap/Long-Press)	Used setTimeout and clearTimeout to differentiate between single tap, double tap, and long press based on timing.
Keyboard Navigation Interference	Added event listeners for keydown with preventDefault to ensure arrow keys scroll the container and space toggles playback without affecting global page scroll.
Deployment
Deploy to Vercel
Push your code to a GitHub repository.

Import the project to Vercel.

Vercel will automatically detect the Vite configuration.

Deploy with default settings.

Deploy to Netlify
Push your code to GitHub.

Drag and drop the dist folder (after running npm run build) to Netlify Drop or connect your GitHub repo.

Author
Khushi Priyadarshni
B.E. Artificial Intelligence & Data Science

Thank you for reviewing my project!