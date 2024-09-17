import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

export default function Sliders() {
  return (
    <div className="w-96 h-96 m-0">
      <Swiper

        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination,Autoplay]}
        className="mySwiper w-96 h-96 m-0 "
      >c
        <SwiperSlide className="flex items-center justify-center  p-6 ">
          <div className="flex flex-col text-center">
            <p className="text-white font-sans font-bold text-2xl mb-4">
              Event Booking and Management
            </p>
            <p className="text-white font-sans text-xl">
              Book tickets for concerts, theater shows, sports events, and more.
              Manage your bookings, receive e-tickets, and easily access your
              event information anytime.
            </p>
          </div>
        </SwiperSlide>
        {/* Add more SwiperSlide components as needed */}
        <SwiperSlide className="flex items-center justify-center  p-6">
          <div className="flex flex-col text-center">
            <p className="text-white font-sans font-bold text-2xl mb-4">
             The Best in the Netherlands
            </p>
            <p className="text-white font-sans text-xl">
              Book tickets from any where , concerts, theater shows, sports events, and more.
              Manage your bookings, receive e-tickets, and easily access your
              event information anytime.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center  p-6">
          <div className="flex flex-col text-center">
            <p className="text-white font-sans font-bold text-2xl mb-4">
             Prices are cheaper than you think !
            </p>
            <p className="text-white font-sans text-xl">
              Book tickets in advance for , concerts, theater shows, sports events, and more.
              Manage your bookings, receive e-tickets, and easily access your
              event information anytime.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
