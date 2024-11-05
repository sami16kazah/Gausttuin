/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/pages/Navbar";
import CheckoutSummary from "@/components/shop/Components/Checkout";

interface CartItem {
  name: string;
  price: string;
  photo: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const initializedCart = storedCart.map((item: any) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(initializedCart);
  }, []);

  const handleAddItem = (index: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = (): number => {
    return cartItems.reduce(
      (acc: number, item: CartItem) => acc + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    console.log("Proceed to checkout");
    // Implement checkout logic here
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-[#5f8053]">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="col-span-3">
              {cartItems.map((item: CartItem, index: number) => (
                <div key={index} className="flex items-center border-b py-2">
                  <Image
                    width={100}
                    height={100}
                    src={item.photo}
                    alt={item.name}
                    className="w-16 h-16 rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-500">${parseFloat(item.price).toFixed(2)}</p>
                    <div className="flex items-center">
                      <button onClick={() => handleRemoveItem(index)} className="border border-red-500 text-red-500 px-2 py-1">
                        −
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => handleAddItem(index)} className="border border-green-600 text-green-600 px-2 py-1">
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-bold">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="col-span-2 flex justify-center">
              <CheckoutSummary
                cartItems={cartItems}
                calculateSubtotal={calculateSubtotal}
                handleCheckout={handleCheckout}
              />
            </div>
          </div>
        )}
        <Link href="/shop" className="mt-4 text-blue-500 underline">
          Continue Shopping
        </Link>
      </div>
    </>
  );
};

export default Cart;
