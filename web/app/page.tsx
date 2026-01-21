import { client } from "./sanity/client";

export default async function Home() {
  const data = await client.fetch(
    `*[_type == "artwork"]{
      title}`
      ,
  );

  const titles = data.map((artwork: { title: string }) => artwork.title).join(", ");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Testing This Out Now</h1>
        <p>Artworks: {titles}</p>
      </main>
    </div>
  );
}
