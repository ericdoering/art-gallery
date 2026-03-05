import { client } from '@/app/sanity/client';
import Navbar from '@/components/Navbar';
import { urlForImage } from '@/lib/urlForImages';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

async function getShopItem(id: string) {
  const query = `*[_type == "artwork" && _id == "${id}"][0] {
    title,
    description,
    price,
    available,
    images
  }`;
  const item = await client.fetch(query);
  return item;
}

function formatPrice(dollars: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(dollars);
}


export default async function ShopItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getShopItem(id);
  if (!item) {
    return notFound();
  }

  const firstImage = item.images?.[0];
  const imageUrl = firstImage?.asset ? urlForImage(firstImage).width(1200).url() : null;
  const price = typeof item.price === 'number' ? item.price : 0;
  const displayPrice = formatPrice(price);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pt-24 pb-16 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-16">
        {/* Left column: product details */}
        <div className="flex flex-col justify-center font-serif">
          <h1 className="text-3xl font-normal tracking-tight text-black md:text-4xl lg:text-[2.5rem] leading-[1.2]">
            {item.title ?? 'Untitled'}
          </h1>
          <p className="mt-6 text-2xl font-normal text-black md:text-3xl">
            {displayPrice}
          </p>
          {item.description && (
            <p className="mt-8 text-base font-normal text-black md:text-lg">
              {item.description}
            </p>
          )}
          <button
            type="button"
            className="mt-10 w-fit font-sans text-base text-neutral-500 focus:outline-none focus:ring-0"
            aria-label="Add to cart"
          >
            <span className="block border-b border-neutral-600 pb-0.5">
              Add To Cart
            </span>
          </button>
        </div>

        <div className="relative min-h-[50vh] w-full md:min-h-[70vh]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={item.title ?? 'Artwork'}
              fill
              className="object-contain object-right"
              sizes="(min-width: 768px) 55vw, 100vw"
              priority
            />
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center bg-neutral-100 text-neutral-400">
              No image
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          href="/shop"
          className="mt-8 inline-flex w-fit items-center gap-1 font-sans text-base text-black underline underline-offset-2 hover:opacity-80"
        >
          ← Back to Shop
        </Link>
      </div>
    </main>
  );
}