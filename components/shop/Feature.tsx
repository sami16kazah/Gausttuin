"use client";
import React, { ReactNode } from "react";
import WineStain from "../../public/images/wine-stain.png";
import Image from "next/image";
import HrImage from "../../public/images/hr.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";


interface FeatureProps {
  text: string;
  children: ReactNode[];
}

export const Feature: React.FC<FeatureProps> = ({ text, children }) => {
  return (
    <div className="flex flex-grow flex-col justify-start bg-white rounded-lg shadow-lg p-6 m-0">
      {/* Header with Title and Horizontal Line */}
      <div className="flex justify-between items-start m-0 p-0">
        <div className="flex flex-col">
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF914D] to-[#556D4C] text-2xl font-semibold">
            {text}
          </h2>
          <Image
            className="my-4 border-0 h-fit w-fit"
            src={HrImage}
            alt="Horizontal rule image"
          />
        </div>

        {/* Decorative Image */}
        <div
          className="flex items-center justify-end ml-4"
          style={{ marginTop: "-20px" }}
        >
          <Image
            src={WineStain}
            alt="wine stain"
            className="absolute h-[18%] w-[18%]"
            objectFit="contain"
          />
        </div>
      </div>
   <div className="flex items-center justify-center ml-20">
      {/* Swiper for Cards */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={2}
        slidesPerView={3}
        breakpoints={{
          // Responsive breakpoints
          // Small screens
          480:{ slidesPerView: 1 },
          640:{ slidesPerView: 1.5 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}

        className="flex items-center justify-center flex-wrap w-full"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            {child}
          </SwiperSlide>
        ))}



      </Swiper>

      </div>
    </div>
  );
};
