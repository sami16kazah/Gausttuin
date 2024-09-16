import React from 'react'
import { FloatingLabel } from '@/components/floating-label'
import { Button } from '@/components/button'
import Link from 'next/link'
export default function SignInForm() {
  return (
    <div className='w-full'>
      <form>
          {/* Email and Password fields */}
      <FloatingLabel
        className="m-2 mt-4 w-full"
        input_name={"Email"}
        type={"email"}
      />
      <FloatingLabel
        className="m-2 mt-4 w-full"
        input_name={"Password"}
        type={"password"}
      />

      {/* Remember me and Forget Password */}
      <div className="flex justify-between items-center w-full mt-3 mb-4 text-sm">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="h-4 w-4 text-green-700" />
          <span className="text-gray-700">Remember me</span>
        </label>
        <Link
          href={"/forgetpassword"}
          className="text-green-700 hover:underline"
        >
          Forget Password?
        </Link>
      </div>

      {/* Sign in Button */}
      <Button
        className="rounded-lg w-full py-2 px-3 text-center mb-3"
        link="/signin"
      >
        Sign in
      </Button>
      </form>
    </div>
  )
}
