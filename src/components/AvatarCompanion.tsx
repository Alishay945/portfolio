"use client";

import React, { useEffect, useRef, useState } from "react";

const SECTION_SUMMARIES: Record<string, string> = {
  works: "Selected case studies: explore my product, network, and design work.",
  "course-works": "UI/UX course projects: research-driven interfaces and prototypes.",
};

export default function AvatarCompanion() {
  const [active, setActive] = useState<string>("works");
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ids = Object.keys(SECTION_SUMMARIES);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          const id = visibleEntries[0].target.id;
          if (id && SECTION_SUMMARIES[id]) {
            setActive(id);
            setVisible(true);
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.play().catch(() => {});
            }
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => setVisible(false), 4500);
          }
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.25 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={`avatar-companion ${visible ? "" : "hidden"}`} aria-hidden={!visible}>
      <div className="avatar-3d-shell">
        <div className="avatar-3d-ring" />
        <video
          ref={videoRef}
          className="avatar-img"
          src="/avatarcompanion.mp4.mp4"
          loop
          muted={false}
          playsInline
          autoPlay
          preload="metadata"
        />
      </div>
      <div className={`avatar-bubble ${visible ? "visible" : "hidden"}`}>
        <div className="avatar-bubble-text">{SECTION_SUMMARIES[active] ?? "Scrolling..."}</div>
        <button
          className="avatar-close"
          aria-label="Hide companion"
          onClick={() => setVisible(false)}
        >
          ×
        </button>
      </div>
    </div>
  );
}
