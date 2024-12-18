"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Helper to format date into Month and Day
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  return { month, day };
};

interface EventCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  date: string;
  background: string;
  location: string[];
}

export const EventCard: React.FC<EventCardProps> = ({
  id,
  name,
  price,
  description,
  date,
  background,
  location,
}) => {
  const { month, day } = formatDate(date);
  const [locationName, setLocationName] = useState("Loading...");

  const router = useRouter();
  const handleGoToEvent = () => router.push(`/event/${id}`);

  // Fetch location name from Google Maps API
  useEffect(() => {
    const fetchLocationName = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse.php?lat=${location[1]}&lon=${location[0]}&zoom=18&format=jsonv2`
        );
        const data = await response.json();
        const formattedAddress =
          data?.display_name || "Unknown location";
        setLocationName(formattedAddress);
      } catch (error) {
        console.error("Error fetching location name:", error);
        setLocationName("Location unavailable");
      }
    };

    fetchLocationName();
  }, [location]);

  return (
    <div className="relative bg-white border rounded-lg shadow-md w-72 overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      {/* Background Image */}
      <div className="relative h-44">
        <Image
          src={background}
          alt="Event background"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Date Display */}
      <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-1 shadow-md">
        <p className="text-orange-500 text-xs font-bold">{month}</p>
        <p className="text-gray-900 text-lg font-extrabold">{day}</p>
      </div>

      {/* Event Info */}
      <div className="p-4 flex flex-col justify-between h-full">
        <h3 className="text-gray-800 font-semibold text-lg">{name}</h3>
        <p className="text-[#556D4C] font-bold text-md my-1">
          $ {price.toLocaleString()} 
        </p>
        <p className="text-gray-600 text-sm truncate">{description}</p>

        {/* Location */}
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span role="img" aria-label="location">
            📍
          </span>
          <p className="ml-1 truncate w-full">{locationName}</p> {/* Truncate location */}
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleGoToEvent}
          className="w-full bg-[#556D4C] text-white py-2 rounded-md font-medium hover:bg-orange-700 transition"
        >
          Book now
        </button>
      </div>
    </div>
  );
};
