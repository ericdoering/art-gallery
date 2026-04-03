"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/urlForImages";

interface SanityImageRef {
  _key?: string;
  asset: { _ref: string; _type: "reference" };
  alt?: string;
}

export interface GalleryArtwork {
  description?: string;
  images: SanityImageRef[];
}

interface GalleryCarouselProps {
  artworks: GalleryArtwork[];
}

export function GalleryCarousel({ artworks }: GalleryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  if (!artworks.length) return null;

  const currentArtwork = artworks[currentIndex];
  const currentImage = currentArtwork.images[0];

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
    setProgressKey((k) => k + 1);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === artworks.length - 1 ? 0 : prev + 1));
    setProgressKey((k) => k + 1);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === artworks.length - 1 ? 0 : prev + 1));
      setProgressKey((k) => k + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoplay, artworks.length]);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative flex flex-col items-center gap-4">
      <button
        onClick={() => {
          setAutoplay((prev) => !prev);
          setProgressKey((k) => k + 1);
        }}
        className="flex items-center gap-3 px-4 py-2 rounded bg-white/80 hover:bg-white text-black shadow"
      >
        {autoplay ? (
          <svg width="16" height="16" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" fill="black" />
            <rect x="14" y="4" width="4" height="16" fill="black" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24">
            <polygon points="5,3 19,12 5,21" fill="black" />
          </svg>
        )}
        <span>{autoplay ? "Pause Autoplay" : "Start Autoplay"}</span>
        {autoplay && (
          <svg key={progressKey} width="40" height="40" className="ml-1">
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke="black"
              strokeWidth="2"
              fill="transparent"
              opacity="0.2"
            />
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke="black"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              style={{
                animation: "progress 6s linear forwards",
              }}
            />
          </svg>
        )}
      </button>
      <div className="relative flex items-center gap-6">
        {!autoplay ? (
          <button
            type="button"
            onClick={goPrev}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white transition text-2xl font-light text-black shadow cursor-pointer"
            aria-label="Previous artwork"
          >
            ←
          </button>
        ) : (
          <></>
        )}
        <div className="relative max-w-[80vw] max-h-[80vh]">
          <Image
            src={urlForImage(currentImage).width(1200).url()}
            alt={currentImage.alt ?? "Artwork image"}
            width={1200}
            height={800}
            className="object-contain max-h-[80vh] w-auto rounded-sm"
            priority
          />
          {currentArtwork.description && (
            <h2 className="text-white text-2xl text-center mt-4">
              {currentArtwork.description}
            </h2>
          )}
        </div>
       {!autoplay ? (
        <button
          type="button"
          onClick={goNext}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white transition text-2xl font-light text-black shadow cursor-pointer"
          aria-label="Next artwork"
        >
          →
        </button>
        ) : (
          <></>
        )}
      </div>
      <style jsx>{`
        @keyframes progress {
          from {
            stroke-dashoffset: ${circumference};
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
