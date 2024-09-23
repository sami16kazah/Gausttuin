import React from 'react'
import Image from 'next/image'
import logo from '../../app/logo.png';
import Link from 'next/link';
import ConfirmResetPasswordForm from './Forms/ConfirmResetingPasswordForm';
export default function ConfirmResetPasswordCard() {
  return (
    <div className="flex justify-center items-center scale-90 w-full md:w-full lg:w-1/2 mb-6 md:mb-0">
      <div className="w-full max-w-md m-10 bg-white border p-6 md:p-8 rounded-xl shadow-lg flex flex-col items-center">
        <Image className="w-fit h-auto mb-4" src={logo} alt="Gausttin logo" />
        <p className="text-black font-sans font-bold text-lg md:text-xl mt-2 mb-4 text-center">
          Reset Your Account Password
        </p>

      <ConfirmResetPasswordForm ></ConfirmResetPasswordForm>
      <hr className="bg-gray-300 w-full h-1 rounded-full my-3" />
      <Link
            href={"/auth/signin"}
            className="text-green-700 hover:underline"
          >
            sign in 
          </Link>
    </div>
  </div>
  )
}
