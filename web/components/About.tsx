import Image from "next/image";
import { client } from "@/app/sanity/client";
import { urlForImage } from "@/lib/urlForImages";

const ABOUT_QUERY = `*[_type == "about"]{
  title,
  description,
  images
}`;

interface SanityImageRef {
  asset: { _ref: string; _type: "reference" };
  alt?: string;
}

interface AboutData {
  title?: string;
  description?: string;
  images?: SanityImageRef[];
}

export default async function About() {
  const data: AboutData[] = await client.fetch(ABOUT_QUERY);
  const about = data?.[0];

  if (!about) {
    return (
      <section className="w-full px-6 py-20">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>About content is not available.</p>
        </div>
      </section>
    );
  }

  const mainImage = about.images?.[0];

  return (
    <section className="w-full px-6 py-20 min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {mainImage && (
          <div className="relative group max-w-md mx-auto md:mx-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/5 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500" />
            <Image
              src={urlForImage(mainImage).width(800).url()}
              alt={mainImage.alt ?? "About image"}
              width={800}
              height={600}
              className="relative rounded-2xl object-cover w-full h-auto shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
              priority
            />
          </div>
        )}

        <div className="space-y-8">
          {about.title && (
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              {about.title}
            </h1>
          )}
          {about.description && (
            <p className="text-lg text-zinc-300 leading-relaxed whitespace-pre-line">
              {about.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
