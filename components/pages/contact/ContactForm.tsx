import { Button } from "@/components/button";
import { FloatingLabel } from "@/components/floating-label";
import React from "react";

export default function ContactForm() {
  return (
    <form className="flex flex-col w-full mt-4 space-y-6">
      {/* First and Last Name */}
      <div className="flex flex-wrap justify-between gap-4">
        <div className="w-full sm:w-[38%]">
          <FloatingLabel
            input_name="First Name"
            type="text"
            className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
          />
        </div>
        <div className="w-full sm:w-[38%]">
          <FloatingLabel
            input_name="Last Name"
            type="text"
            className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
          />
        </div>
      </div>

      {/* Email and Phone */}
      <div className="flex flex-wrap justify-between gap-4">
        <div className="w-full sm:w-[38%]">
          <FloatingLabel
            input_name="Email"
            type="email"
            className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
          />
        </div>
        <div className="w-full sm:w-[38%]">
          <FloatingLabel
            input_name="Phone"
            type="text"
            className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
          />
        </div>
      </div>

      {/* Location and Date */}
      <div className="flex flex-wrap justify-between gap-4">
        <div className="w-full sm:w-[38%]">
          <FloatingLabel
            input_name="Location"
            type="text"
            className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
          />
        </div>
        <div className="w-full sm:w-[38%]">
          <FloatingLabel
            input_name="Date"
            type="date"
            className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
          />
        </div>
      </div>

      {/* Organization and Group Number */}
      <div className="flex flex-wrap justify-between gap-4">
        <div className="w-full sm:w-[38%]">
          <FloatingLabel
            input_name="Organization Name"
            type="text"
            className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
          />
        </div>
        <div className="w-full sm:w-[38%]">
          <FloatingLabel
            input_name="Groupe Number"
            type="text"
            className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <FloatingLabel
          input_name="Message"
          type="text"
          className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button className="bg-gradient-to-t from-[#556D4C] to-[#97B08E] text-white rounded-md hover:to-green-800 px-6 py-3">
          Send
        </Button>
      </div>
    </form>
  );
}
