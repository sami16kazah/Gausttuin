"use client";
import React, { ReactNode, useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

interface EventFeatureProps {
  text: string;
  children: ReactNode[];
}

export const EventFeature: React.FC<EventFeatureProps> = ({
  text,
  children,
}) => {
  const [swiperInitialized, setSwiperInitialized] = useState(false);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mark swiper as initialized after mount
    setSwiperInitialized(true);
  }, []);

  return (
    <div className="relative flex flex-grow flex-col justify-start bg-white rounded-lg shadow-lg p-6 m-0">
      <div className="flex justify-between items-start m-0 p-0">
        <div className="flex flex-col m-2">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF914D] to-[#556D4C] text-2xl font-semibold">
            {text}
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-center w-full m-auto">
        {/* Only render Swiper after it's initialized */}
        {swiperInitialized && (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={100}  // Increased space between slides
            slidesPerView={4.5}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1 },         // For small screens
              480: { slidesPerView: 1.5 },       // For medium screens
              768: { slidesPerView: 2.5 },         // For large screens
              1024: { slidesPerView: 3.5 },        // For extra large screens
            }}
            className="w-full max-w-full mx-auto"  // Make sure it fills the container
          >
            {children.map((child, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center text-center"
              >
                {child}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="flex items-center justify-center mt-4">
        <button
          ref={prevRef}
          className="text-orange-500 hover:text-orange-600 transition duration-300"
        >
          <IoIosArrowDropleft size={40} />
        </button>

        {/* Pagination bullets positioned between the arrows */}
        <div className="w-fit h-10 mx-2">
          <div
            ref={paginationRef}
            className="flex items-center justify-center gap-2"
          ></div>
        </div>

        <button
          ref={nextRef}
          className="text-orange-500 hover:text-orange-600 transition duration-300"
        >
          <IoIosArrowDropright size={40} />
        </button>
      </div>
    </div>
  );
};
