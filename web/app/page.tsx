import Navbar from "@/components/Navbar";
import { client } from "./sanity/client";

export default async function Home() {

  return (
    <div className="">
      <main className="">
        <Navbar />
      </main>
    </div>
  );
}
