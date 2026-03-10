'use client';

import Navbar from '@/components/Navbar';
import SaleDialogue from '@/components/SaleDialogue';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export type ShopItemContentProps = {
  artworkId: string | null;
  title: string | null;
  description: string | null;
  displayPrice: string;
  available: boolean;
  imageUrl: string | null;
};

export default function ShopItemContent({
  artworkId,
  title,
  description,
  displayPrice,
  available,
  imageUrl,
}: ShopItemContentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pt-24 pb-16 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-16">
          <div className="flex flex-col justify-center font-serif">
            <h1 className="text-3xl font-normal tracking-tight text-black md:text-5xl lg:text-[2.5rem] leading-[1.2]">
              {title ?? 'Untitled'}
            </h1>
            {available ? (
              <p className="mt-6 text-2xl font-normal text-black md:text-3xl">
                {displayPrice}
              </p>
            ) : (
              <p className="mt-6 text-2xl text-red-500 font-normal text-black md:text-3xl">
                Sold
              </p>
            )}
            {description && (
              <p className="mt-8 text-2xl font-normal text-black md:text-3xl">
                {description}
              </p>
            )}
            <p className="mt-6 text-base font-small text-black md:text-sm">
              Artwork ID: {artworkId}
            </p>
            {available && (
              <>
                <button
                  onClick={() => setIsOpen(true)}
                  type="button"
                  className="mt-10 rounded-full bg-[#001330] px-12 py-4 text-base font-sans font-medium text-white shadow-lg shadow-indigo-200 transition-transform hover:-translate-y-1 hover:bg-blue-600 cursor-pointer"
                >
                  Contact for Purchase
                </button>
                {isOpen && (
                  <SaleDialogue title={title ?? "Untitled"} artworkId={artworkId ?? "Unknown"} setIsOpen={setIsOpen} />
                )}
              </>
            )}
          </div>

          <div className="relative min-h-[50vh] w-full md:min-h-[70vh]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title ?? 'Artwork'}
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
            className="mt-2 inline-flex w-fit items-center gap-1 font-sans text-base text-black underline underline-offset-2 hover:opacity-80"
          >
            ← Back to Shop
          </Link>
        </div>
      </main>
    </>
  );
}
