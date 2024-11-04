import Image from "next/image";
import WineBottleImage from "../../public/images/wine-bottel.png"; 

export default function WineSection() {
  return (
    <section className="flex items-center justify-center w-full bg-gradient-to-r from-[#AFC2A7] to-[#556D4C] p-4 md:p-10">
      <div className="flex flex-row items-center justify-between max-w-6xl w-full">
        
        {/* Left Side - Text */}
        <div className="flex-1 basis-2/3 text-[#FAF7F2] space-y-3 md:space-y-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug md:leading-tight">
            Wines from all over the world
          </h1>
          <p className="text-sm md:text-base lg:text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.
          </p>
          <button className="px-4 py-2 md:px-6 md:py-3 mt-3 md:mt-4 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600">
            Explore more
          </button>
        </div>
        
        {/* Right Side - Wine Bottle and Glass */}
        <div className="flex-1 basis-1/3 flex items-center justify-center">
          <Image
            src={WineBottleImage}
            alt="Wine Bottle and Glass"
            className="h-auto max-h-[300px] md:max-h-[400px] lg:max-h-[500px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
