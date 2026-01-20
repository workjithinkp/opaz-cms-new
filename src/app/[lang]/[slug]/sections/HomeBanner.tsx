'use client';

import { useEffect, useRef, useState } from 'react';
import { GoUnmute, GoMute } from 'react-icons/go';
import { PageSection } from '@/lib/api';

interface HomeBannerProps {
  section: PageSection;
  lang: string;
}

export default function HomeBanner({ section }: HomeBannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = section.list || [];
  const currentSlide = slides[currentIndex] || slides[0];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {
      // Autoplay may be blocked by browser
    });
  }, [currentIndex]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVideoEnd = () => {
    if (slides.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }
  };

  if (!currentSlide) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Video */}
      {currentSlide.f_1 ? (
        <video
          ref={videoRef}
          key={currentSlide.id}
          playsInline
          loop={slides.length === 1}
          preload="auto"
          poster={currentSlide.i_1 || '/hero-poster.jpg'}
          className="absolute inset-0 h-full w-full object-cover"
          onEnded={handleVideoEnd}
        >
          <source src={currentSlide.f_1} type="video/mp4" />
        </video>
      ) : currentSlide.i_1 ? (
        <video
          ref={videoRef}
          playsInline
          loop
          preload="auto"
          poster={currentSlide.i_1}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ pointerEvents: 'none' }}
        />
      ) : null}

      {/* Sound Toggle Button */}
      {currentSlide.f_1 && (
        <button
          onClick={toggleSound}
          className="absolute right-6 bottom-6 z-10 flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-full bg-[#2d86dd]/40 text-2xl text-white backdrop-blur-md transition duration-300 hover:bg-[#2d86dd]/60"
          aria-label="Toggle sound"
        >
          {isMuted ? <GoMute /> : <GoUnmute />}
        </button>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
