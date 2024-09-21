import React from "react";
import { Button } from "../button";
import Image from "next/image";
import { MdArrowForward } from "react-icons/md";
import Logo from "../../app/logo.png";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

export default function Footer() {
  return (

    <footer className="relative flex flex-col justify-center items-center align-middle w-full h-fit p-8" style={{ backgroundColor: 'rgba(221, 229, 218, 1)' }}>
      <div className="flex flex-col items-center justify-center md:w-1/2 w-full h-fit p-8 rounded-lg mb-6" style={{ backgroundColor: 'rgba(85, 109, 76, 1)' }}>
        <h2 className="font-semibold font-sans text-white text-3xl text-center mb-2">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-white text-center text-base mb-4 font-sans font-thin">
          Unlock a world of exclusive benefits. Be the first to know about our latest updates!
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-md mb-6">
          <div className="flex md:flex-row flex-col w-full">
            <input
              className="flex-grow h-auto px-5 py-3 placeholder:text-black placeholder:font-sans placeholder:font-thin text-black rounded-l-md md:rounded-r-none rounded-r-md md:placeholder:text-left placeholder:text-center"
              style={{ backgroundColor: 'rgba(221, 229, 218, 1)' }}
              placeholder="Enter your name"
            />
            <Button className=" md:w-auto w-full rounded-r-md md:rounded-l-none rounded-l-md  md:mt-0 mt-2 ">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black text-sm w-full max-w-full mt-0 justify-center items-center">
        <div className="flex flex-col items-center md:items-start mb-6">
          <Image src={Logo} className="w-36 h-16 mb-2" alt="logo" />
          <p className="text-center md:text-left font-thin">
            Lorem ipsum dolor sit amet consectetur. Curabitur risus sed proin interdum massa cursus cras quam.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-center text-center md:text-left">
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
        <div className="flex flex-col items-center md:items-center text-center md:text-left">
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
      <div className="flex justify-between md:flex-row flex-col items-center w-full mt-4">
        <p className="font-thin">© De Gastthuin 2024. All rights reserved</p>
        <p className="hover:underline font-thin cursor-pointer">Terms & Conditions</p>
      </div>
    </footer>
  );
}
