"use client"
import React, { ReactNode, useRef, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

interface EventFeatureProps {
  children: ReactNode[];
}

export const EventFeature: React.FC<EventFeatureProps> = ({ children }) => {
  
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mark swiper as initialized after mount
    setSwiperInitialized(true);
  }, []);

  return (
    <div className="flex flex-grow flex-col justify-start bg-white rounded-lg shadow-lg p-6 m-0">
      <div className="flex items-center justify-center w-full  mx-auto">
        {/* Only render Swiper after it's initialized */}
        {swiperInitialized && (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={1}
            slidesPerView={3}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            className="flex items-center justify-center  max-w-[80%] w-full mx-auto"
          >
            {children.map((child, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center text-center space-x-2"
              >
                {child}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="flex items-center justify-center mt-4 ">
        <button
          ref={prevRef}
          className="text-orange-500 hover:text-orange-600 transition duration-300"
        >
          <IoIosArrowDropleft size={40} />
        </button>

        {/* Pagination bullets positioned between the arrows */}
        <div className="w-fit h-10">
          <div
            ref={paginationRef}
            className="flex  m-2 p-2 w-fit h-fit gap-1 "
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
