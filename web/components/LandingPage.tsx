import { client } from "@/app/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

const builder = imageUrlBuilder(client);

function urlFor(source: { _type: string; asset?: { _ref: string } } | null) {
  if (!source?.asset?._ref) return null;
  return builder.image(source).auto("format").fit("max");
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
      <section className="min-h-[60vh] flex items-center justify-center px-6">
        <p className="text-[var(--foreground)]/70 text-lg">
          No landing content found. Add a landing document in Sanity Studio.
        </p>
      </section>
    );
  }

  const { title, description, images } = data;
  const imageUrls = (images ?? [])
    .map((img) => urlFor(img))
    .filter((url): url is NonNullable<typeof url> => url !== null);

  return (
    <section className="min-h-screen pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-[#001330] p-8 rounded-lg">
        <header className="text-center mb-14 md:mb-18">
          <h1 className="font-semibold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--foreground)] mb-5 max-w-3xl mx-auto">
            {title}
          </h1>
          <p className="text-lg text-white sm:text-xl text-[var(--foreground)]/80 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </header>

        {imageUrls.length > 0 && (
          <div className="max-w-[24rem] mx-auto">
            <div
              className={`grid gap-4 sm:gap-6 ${
                imageUrls.length === 1
                  ? "grid-cols-1"
                  : imageUrls.length === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-3"
              }`}
            >
              {imageUrls.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] sm:aspect-[3/4] rounded-lg overflow-hidden bg-[var(--foreground)]/5"
                >
                  <Image
                    src={url.url()}
                    alt={title ? `${title} — image ${i + 1}` : `Gallery image ${i + 1}`}
                    fill
                    sizes={
                      imageUrls.length === 1
                        ? "(max-width: 512px) 100vw, 512px"
                        : imageUrls.length === 2
                          ? "(max-width: 640px) 100vw, 256px"
                          : "(max-width: 640px) 100vw, 170px"
                    }
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
