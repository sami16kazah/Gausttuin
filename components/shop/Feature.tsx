import React from "react";
import WineStain from "../../public/images/wine-stain.png";
import Image from "next/image";
import HrImage from "../../public/images/hr.png"

interface FeatureProps {
  text: string;
}

export const Feature: React.FC<FeatureProps> = ({ text }) => {
  return (
    <div className="flex justify-between items-start bg-white rounded-lg shadow-lg p-6" style={{ height: '120px' }}> {/* Set a fixed height for the parent */}
      {/* Text with gradient */}
      <div className="flex flex-col">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF914D] to-[#556D4C] text-2xl font-semibold">
          {text}
        </h2>
        {/* Horizontal rule matching text width */}
        <Image className="my-4 border-0 h-fit w-fit" src={HrImage} alt="my-4 border-0 h-0.5 bg-gradient-to-r from-[#FF914D] to-[#556D4C] w-full" />
      </div>

      {/* Image at the top, with increased height and negative margin */}
      <div className="flex items-center justify-end ml-4" style={{ marginTop: '-20px' }}>
        <Image
          src={WineStain}
          alt="wine stain"
          className="h-[30%] w-[60%]" // Increased height
          objectFit="contain" // Maintain aspect ratio
        />
      </div>
    </div>
  );
};
