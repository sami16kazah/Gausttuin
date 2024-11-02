// JSX code (React/Next.js)

import Image from "next/image";
import WineBottleImage from "../../public/images/wine-bottel.png"; // Path to your single image with both bottle and glass

export default function WineSection() {
  return (
    <section className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-[#AFC2A7] to-[#556D4C] p-10">
      <div className="flex flex-wrap items-center justify-between max-w-6xl w-full space-x-4">
        
        {/* Left Side - Text */}
        <div className="flex-1 text-[#FAF7F2] space-y-4">
          <h1 className="text-5xl font-bold leading-tight">Wines from all over the world</h1>
          <p className="text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
          </p>
          <button className="px-6 py-3 mt-4 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600">
            Explore more
          </button>
        </div>
        
        {/* Right Side - Wine Bottle and Glass */}
        <div className="flex-1 flex items-center justify-center">
          <Image
            src={WineBottleImage}
            alt="Wine Bottle and Glass"
            className="h-auto max-h-[500px] object-contain" // Adjust max height as needed
          />
        </div>
      </div>
    </section>
  );
}
