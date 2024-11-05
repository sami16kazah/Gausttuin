"use server"; // Server directive for Next.js
import Navbar from "@/components/pages/Navbar";
import dynamic from "next/dynamic";
import ShopProducts from "@/components/shop/Components/ShopProducts";
import CategorySectionImage from "../../../public/images/category-section.png";
import CategoryProducts from "@/components/shop/Components/CategoryProducts";
import CategoryHero from "@/components/shop/Components/CategoryHero";
import { BackGroundSection } from "@/components/shop/BackgroundSection";

// Lazy load Footer component
const LazyComponent = dynamic(
  () => import("@/components/pages/Footer/Footer"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false, // No server-side rendering
  }
);

// Page component
export default async function Page({
  searchParams,
}: {
  searchParams: { id: string; name: string };
}) {
  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s";
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <CategoryHero />
          {searchParams?.id && searchParams?.name ? (
            <CategoryProducts id={searchParams.id} name={searchParams.name} /> // Pass params to CategoryProducts
          ) : (
            <p>Please select a category.</p>
          )}

          <BackGroundSection
            text={text}
            image={CategorySectionImage.src}
            button="Explore more"
          ></BackGroundSection>
          <ShopProducts />
        </main>
        <LazyComponent />
      </div>
    </>
  );
}
