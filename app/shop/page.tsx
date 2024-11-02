"use server"; // Server directive for Next.js

import Navbar from "@/components/pages/Navbar";
import dynamic from "next/dynamic";
import Image from "next/image";
import TipImage from "../../public/images/shop-tips.png";
import MainBackground from "@/components/shop/MainBackground";
import { Feature } from "@/components/shop/Feature";
import { ProductCard } from "@/components/shop/ProductCard";
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
          <div className="flex flex-col w-full h-auto overflow-hidden ">
            <MainBackground></MainBackground>
            <Image
              className="w-screen h-auto -m-1 "
              src={TipImage}
              alt="no shop tipes image"
            ></Image>
          </div>
          <Feature text={"Shop By Category"}></Feature>
          <ProductCard
            name="Name Wines"
            price={200}
            description="the finest from 1990"
            photo="https://res.cloudinary.com/dqlgwevcv/image/upload/v1730569646/Property_1_Variant2_3_567b66241b.png"
          ></ProductCard>
        </main>
        <LazyComponent />
      </div>
    </>
  );
}
