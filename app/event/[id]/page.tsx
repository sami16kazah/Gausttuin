/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import EventList from "@/components/pages/event/EventList";
import Footer from "@/components/pages/Footer/Footer";
import Navbar from "@/components/pages/Navbar";
import QA from "@/components/QA";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaTicketAlt } from "react-icons/fa";
// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

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

async function fetchEventItems(id: string): Promise<Event | null> {
  try {
    const response = await fetch(`/api/event/single`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch event item:", error);
    return null;
  }
}

export default function Page() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams() as { id: string };
  const [locationName, setLocationName] = useState("Loading...");
  const router = useRouter();

  const handleAddToCart = (event: Event) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productExists = cart.find((item: any) => item.name === event.name);
    if (!productExists) {
      cart.push({
        item_type: "ticket_",
        id: event.id,
        name: event.name,
        price: event.price,
        photo: event.background,
        description: event.description,
        date: event.date,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return router.push("/shop/cart");
  };

  // Format the date
  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(date));
  };

  useEffect(() => {
    const fetchLocationName = async (lat: string, lng: string) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=18&format=jsonv2`
        );
        const data = await response.json();
        const formattedAddress = data?.display_name || "Unknown location";
        setLocationName(formattedAddress);
      } catch (error) {
        console.error("Error fetching location name:", error);
        setLocationName("Location unavailable");
      }
    };

    if (params.id) {
      const fetchData = async () => {
        try {
          const item = await fetchEventItems(params.id);
          setEvent(item);
          if (item) fetchLocationName(item.location[1], item.location[0]);
        } catch (err: any) {
          setError(err.message || "Failed to fetch event.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [params.id]);

  // Function to parse guidelines into an array
  const parseGuidelines = (guidelines: string) => {
    if (!guidelines) return [];
    return guidelines
      .split(".")
      .map((guideline) => guideline.trim())
      .filter((guideline) => guideline.length > 0);
  };

  if (loading) {
    return <p>Loading Events...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const guidelinesArray = event?.guidelines
    ? parseGuidelines(event.guidelines)
    : [];

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* Swiper Carousel */}
          <section className="relative w-full">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="w-full h-[500px] sm:h-[300px]"
            >
              {event?.photos &&
                event.photos.map((photo, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-[500px] sm:h-[300px]">
                      <Image
                        src={photo}
                        alt={`Event cover ${index + 1}`}
                        layout="fill" // Ensures the image takes up the container size
                        objectFit="cover" // Ensures the image fills the container properly
                        className="rounded-lg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </section>
          {/* Event Details Card */}
          <div className="mt-6 mx-6 p-6 rounded-lg shadow-md md:flex md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {event?.name}
              </h1>

              {/* Event Info */}
              <div className="flex items-center gap-6 mb-4 text-gray-700">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-[#FF6F61]" />
                  {event?.date ? formatDate(event.date) : "Unknown Date"}
                </p>
                <p className="flex items-center gap-2">
                  <FaTicketAlt className="text-[#FF6F61]" />$
                  {event?.price.toLocaleString()}
                </p>

              </div>

              {/* Tickets Sold */}
              <div className="text-[#556D4C] font-semibold flex-col">
                <div>
                  <span className="text-red-500">✦</span> Location
                </div>
                <div>
                  <span className=" text-gray-900">
                    {locationName}
                  </span>
                </div>
              </div>

              {/* Buy Ticket Button */}
              <button
                onClick={() => handleAddToCart(event!)}
                className="mt-4 bg-[#556D4C] text-white px-8 py-2 rounded-lg hover:bg-orange-800 transition duration-300"
              >
                Buy Ticket
              </button>
            </div>

            {/* Map */}
            {event?.location && (
              <div className="mt-6 md:mt-0 md:w-[45%] h-64 rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps?q=${event.location[1]},${event.location[0]}&output=embed`}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  style={{ border: "0" }}
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          {/* Event Description */}
          <section className="mt-8 px-6">
            <h2 className="text-[#556D4C] text-2xl font-bold mb-4">
              Event Description
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              {event?.description}
            </p>
          </section>
          {/* Event Guidelines */}
          <section className="mt-8 px-6">
            <h2 className="text-[#556D4C] text-2xl font-bold mb-4">
              Event Guidelines and Policies
            </h2>
            <ul className="list-disc list-inside text-gray-800">
              {guidelinesArray.length > 0 ? (
                guidelinesArray.map((guideline, index) => (
                  <li key={index} className="mb-2 text-lg font-sans">
                    {guideline}
                  </li>
                ))
              ) : (
                <p className="text-gray-600">
                  No guidelines available for this event.
                </p>
              )}
            </ul>
          </section>
          {/* Event Video */}
          {event?.video && (
            <section className="mt-8 px-6">
              <h2 className="text-[#556D4C] text-2xl font-bold mb-4">
                Event Video
              </h2>
              <div className="flex justify-center align-middle relative w-full max-w-4xl mx-auto">
                <video
                  src={event.video}
                  className="w-[400px] h-[400px] rounded-lg shadow-md"
                  loop
                  onMouseOver={(e) => e.currentTarget.play()}
                  onMouseOut={(e) => e.currentTarget.pause()}
                />
              </div>
            </section>
          )}
          {/* Additional Components */}
          <QA location={"book"} />
          <EventList />
        </main>
        <Footer />
      </div>
    </>
  );
}
