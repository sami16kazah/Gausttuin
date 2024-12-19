"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingModal from "../LoadingModal";


export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = 1500; // Default timeout in milliseconds

    // Dynamically adjust the timeout based on internet speed
    const measureSpeedAndSetLoading = async () => {
      setLoading(true);

      const timer = setTimeout(() => setLoading(false), timeout);

      return () => clearTimeout(timer);
    };

    measureSpeedAndSetLoading();
  }, [pathname]);

  return (
    <>
      {loading ? <LoadingModal /> : children}
    </>
  );
}
