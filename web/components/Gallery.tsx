import { client } from "@/app/sanity/client";
import { GalleryCarousel } from "./GalleryCarousel";

const GALLERY_QUERY = `*[_type == "artwork" && featured == true]{
  description,
  images
}`;

interface SanityImageRef {
  _key?: string;
  asset: { _ref: string; _type: "reference" };
  alt?: string;
}

interface GalleryArtwork {
  description?: string;
  images: SanityImageRef[];
}

export default async function Gallery() {
  const artworks: GalleryArtwork[] = await client.fetch(GALLERY_QUERY);

  if (!artworks.length) {
    return (
      <section className="w-full min-h-screen px-6 py-20 flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black text-white">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>No featured artwork to display.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen px-6 py-20 flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <div className="max-w-6xl mx-auto flex justify-center">
        <GalleryCarousel artworks={artworks} />
      </div>
    </section>
  );
}
