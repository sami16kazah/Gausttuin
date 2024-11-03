"use client"
import React from "react";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
  photo: string;
  description: string;
  isNew?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  photo,
  description,
  isNew,
}) => {
  return (
    <div className="relative bg-white border rounded-lg shadow-md flex flex-col items-center justify-center m-4 h-96 w-64 overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      {/* New Badge */}
      {isNew && (
        <div className="absolute top-0 left-0 rounded-r-lg bg-[#FF3D00] px-4 py-1 ">
          <p className="text-white text-sm font-bold">New</p>
        </div>
      )}

      {/* Image */}
      <Image
        className="w-56 h-56 rounded-md object-cover mt-4"
        src={photo}
        alt="product-photo"
        width={100}
        height={100}
      />

      {/* Name and Price */}
      <div className="flex items-center justify-between w-full px-4 mt-4">
        <p className="text-lg font-semibold text-[#5f8053] whitespace-nowrap overflow-hidden overflow-ellipsis">
          {name}
        </p>
        <p className="text-lg font-semibold text-orange-500">${price}</p>
      </div>

      {/* Description */}
      <div className="px-4 mt-2">
        <p className="text-sm text-gray-600 text-center line-clamp-2">{description}</p>
      </div>

      {/* Hover effect */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
};
