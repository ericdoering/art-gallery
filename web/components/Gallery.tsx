"use client";

import { useEffect, useState } from "react";
import { client } from "@/app/sanity/client";
import { urlForImage } from "@/lib/urlForImages";
import Image from "next/image";

type SanityImage = {
  _key: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

type Artwork = {
  description?: string;
  images: SanityImage[];
};

const query = `
  *[_type == "artwork" && featured == true]{
    description,
    images
  }
`;

export default function Gallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchArtworks = async () => {
      const data: Artwork[] = await client.fetch(query);
      setArtworks(data);
    };

    fetchArtworks();
  }, []);

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
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="relative flex items-center gap-6">
        {/* Previous */}
        <button
          onClick={goPrev}
          className="flex items-center justify-center w-12 h-12 rounded-full
                     bg-white/80 hover:bg-white transition
                     text-2xl font-light text-black shadow
                     cursor-pointer"
          aria-label="Previous artwork"
        >
          ←
        </button>

        {/* Artwork */}
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

        {/* Next */}
        <button
          onClick={goNext}
          className="flex items-center justify-center w-12 h-12 rounded-full
                     bg-white/80 hover:bg-white transition
                     text-2xl font-light text-black shadow
                     cursor-pointer"
          aria-label="Next artwork"
        >
          →
        </button>
      </div>
    </div>
  );
};
