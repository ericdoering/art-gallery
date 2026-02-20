"use client";

import { useEffect, useState } from "react";
import { client } from "@/app/sanity/client";
import { urlForImage } from "@/lib/urlForImages";
import Image from "next/image";

const query = `
*[_type == "about"]{
  title,
  description,
  images
}`;

export default function About() {
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [mainImage, setMainImage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(query);
        setTitle(data[0]?.title ?? "");
        setDescription(data[0]?.description ?? "");
        setMainImage(data[0]?.images?.[0] ?? null);
      } catch (error) {
        console.error("Error fetching About data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-6 py-20">
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
          {title && (
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              {title}
            </h1>
          )}

          {description && (
            <p className="text-lg text-zinc-300 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
