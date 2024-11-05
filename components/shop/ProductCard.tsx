/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  name: string;
  price: number;
  photo: string;
  description: string;
  date: string;
  discount?: string | null;
}

// Helper function to check if a date is in the current week
const isDateInCurrentWeek = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfWeek = new Date(today);
  const dayOfWeek = today.getDay();
  const mondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
  startOfWeek.setDate(today.getDate() + mondayOffset);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const isSameYear = date.getFullYear() === today.getFullYear();
  const isSameMonth = date.getMonth() === today.getMonth();
  const isInCurrentWeek = date >= startOfWeek && date <= endOfWeek;

  return isSameYear && isSameMonth && isInCurrentWeek;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  photo,
  description,
  date,
  discount,
}) => {
  const isNew = isDateInCurrentWeek(date);
  const [inCart, setInCart] = useState(false);

  // Check if the product is in the cart when the component mounts
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const foundProduct = cart.find((item: any) => item.name === name);
    if (foundProduct) {
      setInCart(true);
    }
  }, [name]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const productExists = cart.find((item: any) => item.name === name);

    if (!productExists) {
      cart.push({ name, price, photo, description, date, discount });
      localStorage.setItem("cart", JSON.stringify(cart));
      setInCart(true);
    }
  };

  const handleRemoveFromCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter((item: any) => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setInCart(false);
  };
  const router = useRouter();
  const handleGoToCart = () => {
    return router.push("/shop/cart");

    // Redirect to cart page or handle cart navigation
  };

  return (
    <div className="relative bg-white border rounded-lg shadow-md flex flex-col items-center justify-center h-96 w-64 overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      {isNew && (
        <div className="absolute top-0 left-0 rounded-r-lg bg-[#FF3D00] px-4 py-1">
          <p className="text-white text-sm font-bold">New</p>
        </div>
      )}
      {discount && (
        <div className="absolute top-7 left-0 rounded-r-lg bg-yellow-500 px-4 py-1">
          <p className="text-slate-900 text-sm font-bold">{discount}%</p>
        </div>
      )}
      <Image
        className="w-56 h-56 rounded-md object-cover mt-4"
        src={photo}
        alt="product-photo"
        width={100}
        height={100}
      />
      <div className="flex items-center justify-between w-full px-4 mt-4">
        <p className="text-lg font-semibold text-[#5f8053] whitespace-nowrap overflow-hidden overflow-ellipsis">
          {name}
        </p>
        <p className="text-lg font-semibold text-orange-500">${price}</p>
      </div>
      <div className="px-4 mt-2">
        <p className="text-sm text-gray-600 text-center line-clamp-2">
          {description}
        </p>
      </div>
      <div className="mt-4 flex gap-2">
        {!inCart ? (
          <button
            onClick={handleAddToCart}
            className="text-orange-600 py-1 px-4 rounded-full transition duration-200 ease-in-out focus:outline-none"
            style={{
              border: "2px solid",
              borderImage: "linear-gradient(45deg, #ff7a18, #ff3d00) 1",
              backgroundColor: "#fff",
            }}
          >
            Add to Cart
          </button>
        ) : (
          <>
            <button
              onClick={handleRemoveFromCart}
              className="text-red-600 py-1 px-4 rounded-full transition duration-200 ease-in-out focus:outline-none"
              style={{
                border: "2px solid",
                borderImage: "linear-gradient(45deg, #ff4d4d, #ff1a1a) 1",
                backgroundColor: "#fff",
              }}
            >
              Remove
            </button>
            <button
              onClick={handleGoToCart}
              className="text-green-600 py-1 px-4 rounded-full transition duration-200 ease-in-out focus:outline-none"
              style={{
                border: "2px solid",
                borderImage: "linear-gradient(45deg, #28a745, #218838) 1",
                backgroundColor: "#fff",
              }}
            >
              Go to Cart
            </button>
          </>
        )}
      </div>
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
