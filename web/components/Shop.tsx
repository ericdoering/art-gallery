import Image from "next/image";
import Link from "next/link";
import { client } from "@/app/sanity/client";
import { urlForImage } from "@/lib/urlForImages";

const SHOP_QUERY = `*[_type == "artwork"]{
  _id,
  title,
  description,
  price,
  available,
  images[]{
    asset,
    alt
  }
}`;

interface SanityImageRef {
  asset: { _ref: string; _type: "reference" };
  alt?: string;
}

interface Artwork {
  _id: string;
  title?: string;
  description?: string;
  price?: number;
  available?: boolean;
  images?: SanityImageRef[];
}

export default async function Shop() {
  const items: Artwork[] = await client.fetch(SHOP_QUERY);

  if (!items.length) {
    return (
      <>
        <section className="w-full min-h-screen px-6 py-20 bg-gradient-to-b from-black via-zinc-900 to-black text-white">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p>No artwork available at the moment.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="w-full min-h-screen px-6 py-20 bg-gradient-to-b from-black via-zinc-900 to-black text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-gray-100 mb-12">
            Shop
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {items.map((item) => {
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
                        alt={firstImage?.alt ?? item.title ?? "Artwork"}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-gray-100 text-center truncate w-full">
                    {item.title ?? item.description ?? "Untitled"}
                  </h2>

                  {item.available ? (
                    <p className="mt-4 text-2xl font-bold text-gray-100 text-center">
                      $ {item.price}.00
                    </p>
                  ) : (
                    <p className="mt-4 text-2xl font-bold text-red-500 text-center">
                      Sold
                    </p>
                  )}
                  <Link href={`/shop/${item._id}`} className="w-full mt-6">
                    <button
                      type="button"
                      className="cursor-pointer w-full bg-[#001330] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                    >
                      View Item
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
