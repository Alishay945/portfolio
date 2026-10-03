"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  playOnScroll?: boolean;
}

export default function CustomVideoPlayer({
  src,
  poster,
  className = "",
  width = 1920,
  height = 1080,
  autoPlay = true,
  playOnScroll = false,
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // IntersectionObserver for visibility detection (optimized: no scroll events)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        if (entry.isIntersecting && videoRef.current && autoPlay) {
          const video = videoRef.current;
          video.muted = false;
          video
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsMuted(false);
            })
            .catch(() => {
              video.muted = true;
              video
                .play()
                .then(() => {
                  setIsPlaying(true);
                  setIsMuted(true);
                })
                .catch(() => {});
            });
        } else if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: [0.5], // Trigger when 50% of video is visible
        rootMargin: "50px",
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Pause on page scroll unless the user is actively interacting with the player
  useEffect(() => {
    const handleScroll = () => {
      if (playOnScroll && (isHovering || isTouching)) {
        return;
      }

      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [playOnScroll, isHovering, isTouching]);

  // Unmute on first user interaction (click anywhere on video)
  const handleVideoClick = useCallback(() => {
    if (!hasInteracted && videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setHasInteracted(true);
    }
    togglePlay();
  }, [hasInteracted]);

  // If playOnScroll is enabled, start playing when the user scrolls over the player
  useEffect(() => {
    if (!playOnScroll || !containerRef.current) return;

    const container = containerRef.current;

    const handleWheel = (event: WheelEvent) => {
      if (!videoRef.current || !isVisible) return;
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!videoRef.current || !isVisible) return;
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    };

    const handleTouchStart = () => {
      setIsTouching(true);
    };

    const handleTouchEnd = () => {
      setIsTouching(false);
    };

    container.addEventListener("wheel", handleWheel, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isVisible, playOnScroll, hasInteracted]);

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);

      // If unmuting, also set hasInteracted to true
      if (!newMutedState) {
        setHasInteracted(true);
      }
    }
  }, []);

  const handlePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
  }, []);

  // Monitor video play/pause events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("play", handlePlayPause);
    video.addEventListener("pause", handlePlayPause);

    return () => {
      video.removeEventListener("play", handlePlayPause);
      video.removeEventListener("pause", handlePlayPause);
    };
  }, [handlePlayPause]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsTouching(true)}
      onTouchEnd={() => setIsTouching(false)}
      className={`relative overflow-hidden rounded-lg bg-black group ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        preload="metadata"
        playsInline
        onClick={handleVideoClick}
      />

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Play button overlay (shows when paused) */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer backdrop-blur-sm"
          onClick={handleVideoClick}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-lg">
            <Play className="w-8 h-8 text-black fill-black ml-1" />
          </div>
        </div>
      )}

      {/* Controls bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex items-center justify-between">
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-200 backdrop-blur-sm"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white fill-white" />
          )}
        </button>

        {/* Mute button */}
        <button
          onClick={toggleMute}
          className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-200 backdrop-blur-sm ml-2"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Visibility indicator */}
        <div className="ml-auto flex items-center gap-2 text-xs text-white/70">
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isVisible ? "bg-green-400" : "bg-red-400"
            }`}
          />
          <span className="hidden sm:inline">
            {isVisible ? "Visible" : "Out of view"}
          </span>
        </div>
      </div>

      {/* Mute notification on first interaction */}
      {!hasInteracted && isMuted && isPlaying && (
        <div className="absolute top-4 left-4 animate-pulse">
          <div className="bg-yellow-500/90 text-black px-3 py-2 rounded-lg text-xs font-semibold backdrop-blur-sm">
            Click to unmute 🔊
          </div>
        </div>
      )}
    </div>
  );
}
