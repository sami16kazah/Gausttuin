import React from "react";
import Image from "next/image";
import logo from "../../app/logo.png";
import Link from "next/link";
import { Button } from "../button";
import { FcGoogle } from "react-icons/fc";
import SignUpFrom from "./Forms/SignUpFrom";

export default function SignUpCard() {
  return (
    <div className="flex justify-center items-center scale-90  md:w-full lg:w-1/2 mb-6 md:mb-0">
      <div className="w-full max-w-md m-10 bg-white border p-6 md:p-8 rounded-xl shadow-lg flex flex-col items-center">
        <Image className="w-36 h-auto mb-4" src={logo} alt="Gausttin logo" />
        <p className="text-black font-sans font-bold text-lg md:text-xl mt-2 mb-4 text-center">
          Sign up to De Gastuin
        </p>

        {/* Form Fields */}
        <SignUpFrom></SignUpFrom>
        
        <hr className="bg-gray-300 w-full h-1 rounded-full my-3" />

        {/* Google Sign-in Button */}
        <Button
          className="rounded-lg w-full py-2 px-4 text-center text-gray-500 bg-gray-300 hover:bg-gray-400"
          link="/signin"
        >
          <FcGoogle className="mr-2" /> Sign Up with Google
        </Button>

        <div className="flex flex-col md:flex-row mt-4 space-x-0 md:space-x-2 text-sm">
          <p>Already a user?</p>
          <Link href={"/auth/signin"} className="text-green-700 hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
