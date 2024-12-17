"use client"; // Make this a client component

import AnimatedWrapper from "@/components/pages/AnimatedWrapper";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import LoadingModal from "../LoadingModal";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Client-side hook to get the current route
  const [loading, setLoading] = useState<boolean>(true);
  const handelClose = () => {
    setLoading((prev) => !prev);
  };
  useEffect(() => {
    // Simulate a loading delay or data fetching logic
    const timer = setTimeout(() => {
      handelClose(); // Set loading to false after a delay
    }, 1500); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <AnimatedWrapper key={pathname}>
      {" "}
      {loading && <LoadingModal onClose={handelClose} />} {!loading && children}
    </AnimatedWrapper>
  );
}
