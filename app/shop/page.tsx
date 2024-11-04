/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"; // Server directive for Next.js
import Image from "next/image";
import Navbar from "@/components/pages/Navbar";
import dynamic from "next/dynamic";
import ShopHero from "@/components/shop/Components/ShopHero";
import ShopProducts from "@/components/shop/Components/ShopProducts";
import ShopCategories from "@/components/shop/Components/ShopCategories";
import ShopSection from "../../public/images/shop-section.png"
// Lazy load Footer component
const LazyComponent = dynamic(
  () => import("@/components/pages/Footer/Footer"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false, // No server-side rendering
  }
);

// Page component
export default async function Page() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <ShopHero></ShopHero>
          <ShopCategories></ShopCategories>
          <Image  className="w-full" src={ShopSection} alt={"shop section"}></Image>
          <ShopProducts></ShopProducts>
        </main>
        <LazyComponent />
      </div>
    </>
  );
}
