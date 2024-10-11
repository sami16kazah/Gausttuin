import React from "react";
import Image from "next/image";
import { MdArrowForward } from "react-icons/md";
import Logo from "../../../app/logo.png";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import NewsLetter from "./NewsLetter";

export default function Footer() {
  return (

    <footer className="relative flex flex-col justify-center items-center align-middle w-full max-h-fit p-8 bg-gradient-to-b from-[#556D4C] via-[#97B08E] " >
      
      <NewsLetter ></NewsLetter>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black text-sm w-full max-w-full mt-0 justify-center items-center">
        <div className="flex flex-col items-center md:items-start mb-6">
          <Image src={Logo} className="w-36 h-16 mb-2" alt="logo" />
          <p className="text-center md:text-left font-thin">
            Lorem ipsum dolor sit amet consectetur. Curabitur risus sed proin interdum massa cursus cras quam.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-center text-center md:text-left md:ml-auto">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <div className="flex flex-col md:flex-row gap-2">
            <a className="hover:underline flex items-center">
              <MdArrowForward className="mr-1" /> Home
            </a>
            <a className="hover:underline flex items-center">
              <MdArrowForward className="mr-1" /> Contact
            </a>
            <a className="hover:underline flex items-center">
              <MdArrowForward className="mr-1" /> Shop
            </a>
            <a className="hover:underline flex items-center">
              <MdArrowForward className="mr-1" /> About Us
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-center text-center md:text-left md:ml-auto">
          <h3 className="font-semibold mb-2">Contact</h3>
          <div className="flex flex-col gap-1">
            <a className="hover:underline">samkazah444@gmail.com</a>
            <a className="hover:underline text-center">+49 152-151-09694</a>
            <div className="flex flex-row gap-2 text-center justify-center">
                <FaFacebook></FaFacebook>
                <FaInstagram></FaInstagram>
                <FaX></FaX>
                <FaWhatsapp></FaWhatsapp>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-[0.5] mt-5 bg-black rounded-3xl" />
      <div className="flex justify-between md:flex-row flex-col items-center w-full ">
        <p className="font-thin">© De Gastthuin 2024. All rights reserved</p>
        <p className="hover:underline font-thin cursor-pointer">Terms & Conditions</p>
      </div>
    </footer>
  );
}
