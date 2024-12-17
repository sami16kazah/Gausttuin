import { useEffect } from "react";
import React from "react";
import Image from "next/image";
import Logo from "../app/logo.png"; // Ensure correct path to the logo

const LoadingModal = () => {
  useEffect(() => {
    // Prevent scrolling when the modal is open
    document.body.classList.add("overflow-hidden");

    // Cleanup when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-white bg-opacity-75 m-auto">
      {/* Logo with WhatsApp-like pulse animation */}
      <div className="whatsapp-pulse">
        <Image
          className="w-32 h-auto" // Adjust the logo size as needed
          src={Logo}
          alt="Loading Logo"
          priority
        />
      </div>
    </div>
  );
};

export default LoadingModal;
