"use server"; // Only use 'use client' if you are using React hooks

import Footer from "@/components/pages/Footer/Footer";
import Navbar from "@/components/pages/Navbar";
import { headers } from "next/headers";

export default async function Page() {
  const userLoggedIn = headers().get("X-Is-Logged-In"); // Access the custom header
  console.log("User logged in header value:", userLoggedIn); // Log the header value for debugging

  return (
    <>
      <Navbar />
      <p>User is logged in: {userLoggedIn}</p>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">{/* Your main content goes here */}</main>
        <Footer />
      </div>
    </>
  );
}
