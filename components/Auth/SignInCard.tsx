import React from 'react'
import Image from 'next/image'

import logo from '../../app/logo.png';
import Link from 'next/link';
import { Button } from '../button';
import { FcGoogle } from 'react-icons/fc';
import SignInForm from './Forms/SignInForm';
export default function SignInCard() {
  return (
    <div className="flex justify-center items-center w-full md:w-1/2 mb-6 md:mb-0">
    <div className="w-full max-w-md bg-white border p-6 md:p-8 rounded-xl shadow-lg flex flex-col items-center justify-center">
      <Image className="w-52 h-auto" src={logo} alt="Gausttin logo" />
      <p className="text-black font-sans font-bold text-lg md:text-2xl mt-4 mb-6 text-center">
        Sign in to De Gasttuin
      </p>

      <SignInForm></SignInForm>
      <hr className="bg-gray-300 w-full h-1 rounded-full my-3" />

      {/* Google Sign-in Button */}
      <Button
        className="rounded-lg w-full py-2 px-3 text-center text-gray-500 bg-gray-300 hover:bg-gray-400"
        link="/signin"
      >
        <FcGoogle className="mr-2" /> Sign in with Google
      </Button>

      <div className="flex mt-4 space-x-2 text-sm">
        <p>New User?</p>
        <Link
          href={"/auth/signup"}
          className="text-green-700 hover:underline"
        >
          Sign up here
        </Link>
      </div>
    </div>
  </div>
  )
}
