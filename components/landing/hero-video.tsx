"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  HERO_VIDEO_MP4,
  HERO_VIDEO_POSTER,
  HERO_VIDEO_WEBM,
} from "@/lib/constants/hero-media";

function revealVideo(video: HTMLVideoElement) {
  video.classList.add("video-background__video--playing");
}

function isAlreadyPlaying(video: HTMLVideoElement): boolean {
  return !video.paused && video.currentTime > 0 && video.readyState >= 2;
}

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlaying = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      revealVideo(video);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (isAlreadyPlaying(video)) {
      revealVideo(video);
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const onTimeUpdate = () => {
      if (video.currentTime > 0) {
        revealVideo(video);
        video.removeEventListener("timeupdate", onTimeUpdate);
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);

    void video.play().catch(() => {
      // Poster remains visible
    });

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  return (
    <div className="video-background" aria-hidden="true">
      <video
        ref={videoRef}
        className="video-background__video"
        playsInline
        autoPlay
        muted
        loop
        preload="auto"
        poster={HERO_VIDEO_POSTER}
        aria-label="Evening street background"
        onPlaying={handlePlaying}
        onLoadedData={handlePlaying}
      >
        <source src={HERO_VIDEO_WEBM} type="video/webm" />
        <source src={HERO_VIDEO_MP4} type="video/mp4" />
      </video>
      <div className="video-background__overlay" />
      <div className="video-background__glow" />
    </div>
  );
}
