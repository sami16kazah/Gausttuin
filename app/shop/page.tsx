"use server"; // Server directive for Next.js


import Navbar from "@/components/pages/Navbar";
import dynamic from "next/dynamic";
import Image from "next/image";
import BackGroundImage from "../../public/images/ContactUs.png"
import { headers } from "next/headers";
// Lazy load Footer component
const LazyComponent = dynamic(() => import("@/components/pages/Footer/Footer"), {
  loading: () => <p>Loading...</p>,
  ssr: false, // No server-side rendering
});

// Page component
export default async function Page() {

 const userLoggedIn = headers().get("X-name");

  return (
    <>
      <Navbar />
      <p>user is {userLoggedIn}</p>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
            <div className="w-full h-40 overflow-hidden">
                <Image className="w-screen h-full " src={BackGroundImage} alt="no shop background image"></Image>
            </div>
            <div>
                <p>hello shop</p>
            </div>
        </main>
        <LazyComponent />
      </div>
    </>
  );
}
