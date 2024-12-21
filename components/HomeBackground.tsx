/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  location: string[];
  guidelines: string;
  photos: string[];
  video: string;
  price: number;
  background: string;
}

interface MainEvent {
  id: string;
  title: string;
  description: string;
  button_name: string;
  event: Event;
}

async function fetchEventItems(): Promise<MainEvent | null> {
  try {
    const response = await fetch(`/api/event/main`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch main event:", error);
    return null;
  }
}

export default function HomeBackground() {
  const [mainEvent, setEvent] = useState<MainEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await fetchEventItems();
        setEvent(item);
      } catch (err:any) {
        setError(err.message || "Failed to fetch event.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading Events...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log(mainEvent);
  return (
    <section
      className="flex items-center justify-center w-full bg-gradient-to-r from-[#AFC2A7] to-[#556D4C] p-4 md:p-10"
      style={{
        backgroundImage: `url(${mainEvent?.event.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-row items-center justify-between max-w-6xl w-full">
        {/* Left Side - Text */}
        <div className="flex-1 basis-2/3 text-[#FAF7F2] space-y-3 md:space-y-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug md:leading-tight">
            {mainEvent?.title}
          </h1>
          <p className="text-sm md:text-base lg:text-lg">
            {mainEvent?.description}
          </p>
          <button
            onClick={() => {
              router.push(`/event/${mainEvent?.event.id}`);
            }}
            className="px-4 py-2 md:px-6 md:py-3 mt-3 md:mt-4 font-semibold text-white bg-[#556D4C] rounded-md hover:bg-orange-800 cursor-pointer"
          >
            {mainEvent?.button_name}
          </button>
        </div>

        {/* Right Side - Optional Media */}
        <div className="flex-1 basis-1/3 flex items-center justify-center">
          {mainEvent?.event.background && (
            <Image
              src={mainEvent.event.background}
              alt={mainEvent.title}
              width={300}
              height={300}
              className="h-auto max-h-[300px] md:max-h-[400px] lg:max-h-[500px] object-contain"
            />
          )}
        </div>
      </div>
    </section>
  );
}
