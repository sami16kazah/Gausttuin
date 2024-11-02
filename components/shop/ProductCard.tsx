import React from "react";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: number;
  photo: string;
  description: string;
  isNew?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  photo,
  description,
  isNew,
}) => {
  return (
    <div className="relative flex flex-col bg-white rounded-lg shadow-lg p-4 overflow-hidden">
      {/* Gradient Border */}
      <div className="absolute inset-0 rounded-lg border-4 border-transparent  z-0" />
      
      {/* Card Content */}
      <div className="relative z-10">
        {/* Image */}
        <Image
          className="rounded-lg h-32 w-full object-cover"
          src={photo}
          width={100}
          height={100}
          alt={name}
        />
        {/* "New" Badge */}
        {isNew && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
            New
          </span>
        )}
        {/* Product Details */}
        <h3 className="mt-2 text-lg font-semibold">{name}</h3>
        <p className="text-[#FF914D] font-bold">{price} €</p>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
};
