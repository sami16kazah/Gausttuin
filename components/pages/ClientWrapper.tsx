"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingModal from "../LoadingModal";
import { getInternetSpeed } from "@/util/getInternetSpeed";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let timeout = 1500; // Default timeout in milliseconds

    // Dynamically adjust the timeout based on internet speed
    const measureSpeedAndSetLoading = async () => {
      setLoading(true);

      const speed = await getInternetSpeed();

      // Adjust timeout: Faster speed = shorter delay, Slower speed = longer delay
      if (speed > 5000000) timeout = 1000; // Fast network (5 Mbps+)
      else if (speed > 2000000) timeout = 1500; // Moderate network (2-5 Mbps)
      else timeout = 2000; // Slow network (<2 Mbps)

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
