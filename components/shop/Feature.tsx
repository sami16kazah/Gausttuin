"use client";
import React, { ReactNode, useRef } from "react";
import WineStain from "../../public/images/wine-stain.png";
import Image from "next/image";
import HrImage from "../../public/images/hr.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

interface FeatureProps {
  text: string;
  children: ReactNode[];
}

export const Feature: React.FC<FeatureProps> = ({ text, children }) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-grow flex-col justify-start bg-white rounded-lg shadow-lg p-6 m-0">
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

      <div className="flex items-center justify-center w-full max-w-[80%] mx-auto">
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
          onBeforeInit={(swiper) => {
            const navigation = swiper.params.navigation as {
              prevEl?: HTMLElement | null;
              nextEl?: HTMLElement | null;
            };
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;

            const pagination = swiper.params.pagination as {
              el?: HTMLElement | null;
            };
            pagination.el = paginationRef.current;

            swiper.navigation.update();
            swiper.pagination.update();
          }}
          breakpoints={{
            124: { slidesPerView: 1 },
            280: { slidesPerView: 1 },
            320: { slidesPerView: 1 },
            480: { slidesPerView: 1 },
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="flex items-center justify-center  max-w-[80%] w-full mx-auto "
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
