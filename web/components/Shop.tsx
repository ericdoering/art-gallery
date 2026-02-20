/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/app/sanity/client";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/urlForImages";

export default async function Shop() {
  const items = await client.fetch(`
    *[_type == "artwork"]{
      _id,
      name,
      images[]{
        asset,
        alt
      }
    }
  `);

  return (
    <div className="px-6 py-10">
      <h1 className="text-5xl font-bold text-center mb-12">Shop</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {items.map((item: any) => {
          const firstImage = item.images?.[0];
          const imageUrl = firstImage?.asset
            ? urlForImage(firstImage).width(600).url()
            : null;

          return (
            <div
              key={item._id}
              className="bg-black shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-6"
            >
              <div className="w-full h-60 flex items-center justify-center bg-black rounded-lg relative">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={firstImage?.alt || item.name}
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              <h2 className="mt-4 text-2xl font-bold text-gray-100 text-center">
                {item.name}
              </h2>

              <Link href={`/shop/${item._id}`} className="w-full mt-6">
                <button className="cursor-pointer w-full bg-primary bg-[#001330] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200">
                  View Item
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
