import { client } from '@/app/sanity/client';
import { urlForImage } from '@/lib/urlForImages';
import { notFound } from 'next/navigation';
import ShopItemContent from './ShopItemContent';

async function getShopItem(id: string) {
  const query = `*[_type == "artwork" && _id == "${id}"][0] {
    title,
    description,
    artworkId,
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
  const available = item.available ?? false;
  const artworkId = item.artworkId ?? null;

  return (
    <>
      <ShopItemContent
        title={item.title ?? null}
        description={item.description ?? null}
        displayPrice={displayPrice}
        available={available}
        imageUrl={imageUrl}
        artworkId={artworkId}
      />
    </>
  );
}
