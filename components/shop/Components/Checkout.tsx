/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";
import { MdMyLocation } from "react-icons/md";

interface CartItem {
  id: number;
  name: string;
  price: string;
  photo: string;
  quantity: number;
}

interface CheckoutSummaryProps {
  cartItems: CartItem[];
  calculateSubtotal: () => number;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  cartItems,
  calculateSubtotal,
}) => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhoneNumber] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    phone?: string;
    location?: string;
  }>({});

  const handleSetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data && data.address) {
                const city =
                  data.address.city ||
                  data.address.town ||
                  data.address.village ||
                  "Location found";
                setLocation(`${city}, ${data.display_name}`);
              } else {
                setLocation("Unable to retrieve location.");
              }
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
              setLocation("Location found, but unable to retrieve address.");
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(
            "Unable to retrieve your location. Please ensure location services are enabled."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const validateFields = () => {
    const errors: { email?: string; phone?: string; location?: string } = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^\d{10,}$/.test(phone)) {
      errors.phone = "Invalid phone number.";
    }

    if (!location) {
      errors.location = "Location is required.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    if (!validateFields()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`/api/payment`, {
        cartItems,
        discount,
        couponCode,
        email,
        phone,
        location, // Send location as required address
      });
      setIsLoading(false);
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error("Checkout failed:", error);
      setIsLoading(false);
      setError("Failed to initiate payment. Please try again.");
    }
  };

  const handleApplyCoupon = async () => {
    setError(null);
    setSuccessMessage(null);
    calculateSubtotal();

    try {
      const response = await axios.post(`/api/coupon`, { code: couponCode });
      setDiscount(response.data.discount);
      setSuccessMessage(response.data.message);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "An error occurred while applying the coupon."
      );
    }
  };

  const totalAmount = calculateSubtotal();
  const discountedTotal = totalAmount - discount;

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
        <p className="text-green-600">-${discount > 0 ? `${discount}` : "0"}</p>
      </div>

      <p className="font-bold">Apply Coupon</p>
      <div className="flex items-center mt-2">
        <input
          type="text"
          className="border rounded-l p-2 flex-1 bg-[#f0f5e8]"
          placeholder="Enter Your Code"
          value={couponCode}
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
      {successMessage && (
        <p className="text-green-600 mt-2">{successMessage}</p>
      )}

      <hr className="mt-12 p-2" />

      <div className="mt-4">
        <label className="block font-semibold mb-1">Email:</label>
        <input
          type="email"
          className="border rounded p-2 w-full bg-[#f0f5e8]"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {fieldErrors.email && (
          <p className="text-red-500 mt-1">{fieldErrors.email}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="block font-semibold mb-1">Phone Number:</label>
        <input
          type="tel"
          className="border rounded p-2 w-full bg-[#f0f5e8]"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {fieldErrors.phone && (
          <p className="text-red-500 mt-1">{fieldErrors.phone}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="block font-semibold mb-1 ">Location:</label>
        <div className="flex items-center">
          <input
            type="text"
            className="border rounded p-2 w-full bg-[#f0f5e8]"
            placeholder="Your current address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <MdMyLocation
            onClick={handleSetLocation}
            className="cursor-pointer ml-2 text-lg"
          />
        </div>
        {fieldErrors.location && (
          <p className="text-red-500 mt-1">{fieldErrors.location}</p>
        )}
      </div>

      <div className="flex justify-between my-2 py-2">
        <p className="mt-2 leading-relaxed">Total price:</p>
        <p className="font-bold mt-2">${discountedTotal.toFixed(2)}</p>
      </div>

      <button
        onClick={handleCheckout}
        className="mt-4 bg-[#5f8053] hover:transition hover:duration-300 hover:ease-in-out hover:bg-[#6d985d] text-white py-2 px-4 rounded w-full"
      >
        {loading ? " Checking out ... " : "Checkout"}
      </button>
    </div>
  );
};

export default CheckoutSummary;
