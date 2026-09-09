"use client";

import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

export interface HeroVideoHandle {
  seekToTime: (timeInSeconds: number) => void;
  play: () => void;
  pause: () => void;
  getCurrentTime: () => number;
  togglePlay: () => void;
  toggleMute: () => void;
  restart: () => void;
  getIsPlaying: () => boolean;
  getIsMuted: () => boolean;
}

interface HeroVideoProps {
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  className?: string;
  showControls?: boolean;
  isHeroRevealed?: boolean;
}

export const HeroVideo = forwardRef<HeroVideoHandle, HeroVideoProps>(
  ({ onTimeUpdate, className = "", showControls = true, isHeroRevealed = false }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(22.18);

    // Force autoplay on mount with programmatic muted property
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      // Essential for cross-browser autoplay compliance
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("muted", "");

      const attemptPlay = () => {
        const promise = video.play();
        if (promise !== undefined) {
          promise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              setIsPlaying(false);
              const onGesture = () => {
                video.play().then(() => setIsPlaying(true)).catch(() => {});
                window.removeEventListener("click", onGesture);
                window.removeEventListener("scroll", onGesture);
                window.removeEventListener("touchstart", onGesture);
              };
              window.addEventListener("click", onGesture, { once: true });
              window.addEventListener("scroll", onGesture, { once: true });
              window.addEventListener("touchstart", onGesture, { once: true });
            });
        }
      };

      attemptPlay();
    }, []);

    useImperativeHandle(ref, () => ({
      seekToTime: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      },
      play: () => {
        if (videoRef.current) {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      },
      pause: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      getCurrentTime: () => videoRef.current?.currentTime || 0,
      togglePlay,
      toggleMute,
      restart: handleRestart,
      getIsPlaying: () => isPlaying,
      getIsMuted: () => isMuted,
    }));

    const togglePlay = () => {
      if (!videoRef.current) return;
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    const toggleMute = () => {
      if (!videoRef.current) return;
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    };

    const handleRestart = () => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    };

    return (
      <div className={`absolute inset-0 z-0 overflow-hidden bg-[#0d0e10] ${className}`}>
        {/* HTML5 Universal Video Stream */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/video/poster_21s.jpg"
          onTimeUpdate={() => {
            if (videoRef.current) {
              const cur = videoRef.current.currentTime;
              const dur = videoRef.current.duration || 22.18;
              if (!isHeroRevealed) {
                setCurrentTime(cur);
                setDuration(dur);
              }
              if (onTimeUpdate) {
                onTimeUpdate(cur, dur);
              }
            }
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/video/hero_cinematic_22s.mp4" type="video/mp4" />
          <source src="/video/hero_construction.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Architectural Monolith Gradient Overlays (Smoothly activated when hero reveals) */}
        {/* Top bar header protection */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-10 bg-gradient-to-b from-[#0d0e10]/85 via-transparent to-transparent h-32 pointer-events-none transition-opacity duration-1000 ${
            isHeroRevealed ? "opacity-100" : "opacity-20"
          }`}
        />

        {/* Deep atmospheric fog and seamless fade-to-black ground fusion */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-10 h-[55vh] min-h-[420px] pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 35%, rgba(13, 14, 16, 0.4) 65%, rgba(13, 14, 16, 0.85) 85%, #0d0e10 100%)",
          }}
        />
        {/* Grounding fog right at base ensuring streets/ground dissolve into #0d0e10 */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-10 h-48 pointer-events-none bg-gradient-to-t from-[#0d0e10] via-[#0d0e10]/90 to-transparent"
        />

        {/* Left-side typographic contrast veil */}
        <div
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 z-10 w-full max-w-3xl bg-gradient-to-r from-[#0d0e10]/80 via-[#0d0e10]/30 to-transparent pointer-events-none transition-opacity duration-1000 ${
            isHeroRevealed ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Hairline 4rem Architectural Grid Overlay */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-10 bg-architectural-grid pointer-events-none transition-opacity duration-1000 ${
            isHeroRevealed ? "opacity-40" : "opacity-15"
          }`}
        />

        {/* Micro Video Controller & Audio Dock — Active exclusively in cinematic intro mode */}
        {showControls && !isHeroRevealed && (
          <div className="absolute bottom-6 right-4 sm:right-8 z-30 flex items-center gap-2 bg-[#0d0e10]/80 backdrop-blur-md border border-[#c5a880]/30 px-2.5 py-1.5 font-mono text-[10px] text-[#e3e2e5] shadow-2xl">
            <span className="flex items-center gap-1.5 pr-2 text-[#c5a880] tracking-widest text-[9px] uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="hidden sm:inline">VÍDEO MASTER</span>
            </span>
            <span className="text-[#8e9196] border-l border-[#4d463c]/40 pl-2 pr-1">
              {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
            </span>
            <button
              onClick={togglePlay}
              className="p-1 hover:text-[#c5a880] transition-colors"
              title={isPlaying ? "Pausar" : "Reproduzir"}
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#c5a880]" /> : <Play className="w-3.5 h-3.5 text-white" />}
            </button>
            <button
              onClick={handleRestart}
              className="p-1 hover:text-[#c5a880] transition-colors"
              title="Reiniciar"
              aria-label="Reiniciar"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={toggleMute}
              className="p-1 hover:text-[#c5a880] transition-colors border-l border-[#4d463c]/40 pl-2"
              title={isMuted ? "Ativar áudio" : "Silenciar"}
              aria-label={isMuted ? "Ativar áudio" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#8e9196]" /> : <Volume2 className="w-3.5 h-3.5 text-[#c5a880]" />}
            </button>
          </div>
        )}
      </div>
    );
  }
);

HeroVideo.displayName = "HeroVideo";

