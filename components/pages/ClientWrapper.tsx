"use client"; // Make this a client component

import AnimatedWrapper from "@/components/pages/AnimatedWrapper";
import { usePathname } from "next/navigation";
import React from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Client-side hook to get the current route

  return <AnimatedWrapper key={pathname}>{children}</AnimatedWrapper>;
}
