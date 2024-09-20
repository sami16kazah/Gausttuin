'use client'
import SignInCard from "@/components/Auth/SignInCard";
import background from "../../background.png";
import Sliders from "@/components/Auth/Swiper";
import { useSearchParams } from 'next/navigation'
import { useState,useEffect } from "react";
import Modal from "@/components/Modal";
export default function SignIn() {
  const searchParams = useSearchParams()
  const show= searchParams.get('show');
  const title = searchParams.get('title');
  const description = searchParams.get('message');
  const [showModel,setShowModel]=useState<boolean>(false);
    // Convert the 'show' query param to a boolean and handle null case
    useEffect(() => {
      if (show !== null) {
        setShowModel(show === 'true'); // Convert string to boolean
      }
    }, [show]);

    const handelClose = ()=>{
      setShowModel((prev)=>!prev);
    }
  
  return (
    <>
      {showModel && <Modal onClose={handelClose} title={title!} description={description!} buttonDescription={"Accept"}></Modal>}
      {/* background image  */}

    <div
      className="relative h-screen w-full"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover", // Ensure the image covers the full page
        backgroundPosition: "center", // Center the background image
      }}
    >
      
      {/* background opacity */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(52, 65, 48, 0.525) 0%, rgba(46, 57, 42, 0.75) 50.5%)`,
        }}
      ></div>

      {/* container */}
      
      <div className="relative container mx-auto h-full flex flex-col md:flex-row items-center justify-center px-4 md:px-10">
        {/* Left column */}
        <SignInCard></SignInCard>

        {/* Right column (hidden on small screens) */}
        <div className="hidden md:flex md:flex-col  w-full md:w-1/2 justify-start items-center">
          <p className="flex justify-center items-center text-orange-500 font-sans font-bold text-4xl">
            Welcom To De Guesttuin
          </p>
          <div className="w-64 h-64 flex justify-center">
            <Sliders></Sliders>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
