import React from "react";
import { FloatingLabel } from "@/components/floating-label";
import { Button } from "@/components/button";
export default function SignUpFrom() {
  return (
    <div className="w-full">
      <form>
        <div className="w-full flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <FloatingLabel
              className="w-full"
              input_name={"First Name"}
              type={"text"}
            />
            <FloatingLabel
              className="w-full"
              input_name={"Last Name"}
              type={"text"}
            />
          </div>

          <FloatingLabel
            className="w-full"
            input_name={"Email"}
            type={"email"}
          />

          <FloatingLabel
            className="w-full"
            input_name={"Password"}
            type={"password"}
          />

          <FloatingLabel
            className="w-full"
            input_name={"Confirm Password"}
            type={"password"}
          />

          <FloatingLabel
            className="w-full"
            input_name={"Telephone Number"}
            type={"tel"}
          />
        </div>

        {/* Sign Up Button */}
        <Button
          className="rounded-lg w-full py-2 px-4 text-center mb-3"
          link="/signin"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}
