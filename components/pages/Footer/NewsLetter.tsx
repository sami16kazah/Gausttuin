"use client";
import React, { useState } from "react";
import { Button } from "@/components/button";
import Modal from "@/components/Modal";

export default function NewsLetter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [show,setShow] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const handelClose = ()=>{
    setShow((prev)=>!prev);
  }

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return; // Stop submission if the email is invalid
    } else {
      setEmailError(null); // Clear error if valid
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/news-letter", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await response.json();
      setSuccessMessage(data.message); // Set success message
      setShow(true);
    } catch (error) {
      setError(
        error instanceof Error ? "This email is already subscribed" : "An unknown error occurred"
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center md:w-1/2 w-full h-fit p-8 rounded-lg mb-6"
      style={{ backgroundColor: "rgba(85, 109, 76, 1)" }}
      onSubmit={handleSubmit} // Handle form submission
    >
      <h2 className="font-semibold font-sans text-white text-3xl text-center mb-2">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-white text-center text-base mb-4 font-sans font-thin">
        Unlock a world of exclusive benefits. Be the first to know about our
        latest updates!
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-md mb-6">
        <div className="flex md:flex-row flex-col w-full">
          <input
            className={`flex-grow h-auto px-5 py-3 placeholder:text-black placeholder:font-sans placeholder:font-thin text-black rounded-l-md md:rounded-r-none rounded-r-md md:placeholder:text-left placeholder:text-center ${
              emailError ? "border border-red-500" : ""
            }`}
            style={{ backgroundColor: "rgba(221, 229, 218, 1)" }}
            placeholder="Enter your email"
            name="NewsLetterEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="md:w-auto w-full rounded-r-md md:rounded-l-none rounded-l-md md:mt-0 mt-2"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
      </div>
      {emailError && <p className="text-red-500 font-sans font-semibold">{emailError}</p>}{" "}
      {/* Display email error message */}
      {error && <p className="text-red-500 font-sans font-semibold">{error}</p>}{" "}
      {/* Display general error message */}
      {successMessage && show && <Modal onClose={handelClose} title={"Subscribed Successfully"} description={successMessage} buttonDescription={"Accept"}></Modal>}{" "}
      {/* Display success message */}
    </form>
  );
}
