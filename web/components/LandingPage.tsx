import { client } from "@/app/sanity/client";
import { urlForImage } from "@/lib/urlForImages";
import Image from "next/image";

function urlFor(source: { _type: string; asset?: { _ref: string } } | null) {
  if (!source?.asset?._ref) return null;
  return urlForImage(source).auto("format").fit("max");
}

const LANDING_QUERY = `*[_type == "landing"][0] {
  title,
  description,
  images
}`;

type LandingData = {
  title: string;
  description: string;
  images: Array<{
    _type: string;
    _key?: string;
    asset?: { _ref: string };
  }>;
} | null;

export default async function LandingPage() {
  const data: LandingData = await client.fetch(LANDING_QUERY);

  if (!data) {
    return (
      <>
        <section className="min-h-[60vh] flex items-center justify-center px-6 bg-gradient-to-b from-black via-zinc-900 to-black text-white">
          <p className="text-[var(--foreground)]/70 text-lg">
            No landing content found. Add a landing document in Sanity Studio.
          </p>
        </section>
      </>
    );
  }

  const { title, description, images } = data;
  const imageUrls = (images ?? [])
    .map((img) => urlFor(img))
    .filter((url): url is NonNullable<typeof url> => url !== null);

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black px-4 sm:px-6 sm:py-20 lg:px-8 lg:py-4 text-white">
        <div className="mx-auto max-w-6xl rounded-2xl bg-[#2A2450] p-5 sm:p-8 lg:p-12">
          <header className="mb-10 text-center sm:mb-12">
            <h1 className="mx-auto mb-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-lg">
              {title}
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-2xl drop-shadow-lg">
              - {description} -
            </p>
          </header>

          {imageUrls.length > 0 && (
            <div className="mx-auto max-w-5xl">
              <div
                className={`grid gap-4 ${
                  imageUrls.length === 1
                    ? "grid-cols-1"
                    : imageUrls.length === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-3 md:auto-rows-[220px] lg:auto-rows-[260px]"
                }`}
              >
                {imageUrls.map((url, i) => (
                  <div
                    key={i}
                    className={`group relative overflow-hidden rounded-lg md:rounded-xl bg-white/5 shadow-xl
              ${
                imageUrls.length >= 3
                  ? i === 0
                    ? "aspect-[4/3] md:aspect-auto md:col-span-2 md:row-span-2"
                    : "aspect-[4/3] md:aspect-auto"
                  : "aspect-[4/3]"
              }`}
                  >
                    <Image
                      src={url.url()}
                      alt={
                        title
                          ? `${title} — image ${i + 1}`
                          : `Gallery image ${i + 1}`
                      }
                      fill
                      priority={i === 0}
                      sizes={
                        imageUrls.length === 1
                          ? "100vw"
                          : imageUrls.length === 2
                            ? "(max-width: 768px) 100vw, 50vw"
                            : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      }
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
