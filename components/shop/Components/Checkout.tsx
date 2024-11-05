/* eslint-disable @typescript-eslint/no-explicit-any */
// components/CheckoutSummary.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface CartItem {
  name: string;
  price: string;
  photo: string;
  quantity: number;
}

interface CheckoutSummaryProps {
  cartItems: CartItem[];
  calculateSubtotal: () => number;
  handleCheckout: () => void;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ cartItems, calculateSubtotal, handleCheckout }) => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleApplyCoupon = async () => {
    setError(null);
    setSuccessMessage(null);
    
    const totalAmount = calculateSubtotal();
    
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/apply-coupon`, {
        code: couponCode,
        totalAmount,
      });
      setDiscount(response.data.discountPercentage);
      setSuccessMessage(response.data.message);
    } catch (err:any) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const totalAmount = calculateSubtotal();
  const discountedTotal = totalAmount - (totalAmount * discount) / 100;

  return (
    <div className="max-w-md w-full bg-white p-4 rounded-md shadow-md border border-[#5f8053] mx-auto">
      <h2 className="text-lg font-bold">Summary</h2>
      <hr className="my-2" />
      <div className="flex justify-between my-2 py-2">
        <p>Subtotal price:</p>
        <p>${totalAmount.toFixed(2)}</p>
      </div>
      <div className="flex justify-between my-2 py-2">
        <p>Discount:</p>
        <p className="text-green-600">-{discount > 0 ? `${discount}%` : '0%'}</p>
      </div>
      <p className="font-bold">Give code</p>
      <div className="flex items-center mt-2">
        <input
          type="text"
          className="border rounded-l p-2 flex-1 bg-[#f0f5e8]"
          placeholder="Enter Your Code"
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-[#5f8053] text-white p-2 rounded-r w-32 hover:transition hover:duration-300 hover:ease-in-out hover:bg-[#6d985d]"
        >
          Apply
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
      <hr className="mt-12 p-2" />
      <div className="flex justify-between my-2 py-2">
        <p className="mt-2 leading-relaxed">Total price:</p>
        <p className="font-bold mt-2">${discountedTotal.toFixed(2)}</p>
      </div>
      <button
        onClick={handleCheckout}
        className="mt-4 bg-[#5f8053] hover:transition hover:duration-300 hover:ease-in-out hover:bg-[#6d985d] text-white py-2 px-4 rounded w-full"
      >
        Checkout
      </button>
    </div>
  );
};

export default CheckoutSummary;
