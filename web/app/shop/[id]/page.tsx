import Navbar from '@/components/Navbar';

export default function ShopItemPage({ params }: { params: { id: string }}) {

    return (
      <main>
        <Navbar />
        <h1>Shop Item</h1>
      </main>
    );
  }