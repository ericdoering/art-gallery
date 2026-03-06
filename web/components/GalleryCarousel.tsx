"use client";

import { useState } from "react";
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

  if (!artworks.length) return null;

  const currentArtwork = artworks[currentIndex];
  const currentImage = currentArtwork.images[0];

  const goPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? artworks.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev === artworks.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="relative flex items-center gap-6">
        <button
          type="button"
          onClick={goPrev}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white transition text-2xl font-light text-black shadow cursor-pointer"
          aria-label="Previous artwork"
        >
          ←
        </button>

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

        <button
          type="button"
          onClick={goNext}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 hover:bg-white transition text-2xl font-light text-black shadow cursor-pointer"
          aria-label="Next artwork"
        >
          →
        </button>
      </div>
    </>
  );
}
