import { FC } from "react";

interface BackGroundSectionProps {
  image: string;
  title?: string;
  text: string;
  button?: string;
}

export const BackGroundSection: FC<BackGroundSectionProps> = ({
  image,
  title,
  text,
  button,
}) => {
  return (
    <section
      className="flex items-center justify-center w-full bg-gradient-to-r  p-4 md:p-10"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover", // Ensure the image covers the full page
        backgroundPosition: "center", // Center the background image
      }}
    >
      <div className="flex flex-row items-center justify-between max-w-6xl w-full">
        {/* Left Side - Text */}
        <div className="flex-1 basis-2/3 text-[#FAF7F2] space-y-3 md:space-y-4">
          {title && (
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-snug md:leading-tight">
              {title}
            </h1>
          )}
          <p className="text-sm md:text-base lg:text-lg">{text}</p>
          {button && (
            <button className="px-4 py-2 md:px-6 md:py-3 mt-3 md:mt-4 font-semibold text-white bg-orange-500 rounded-md hover:bg-orange-600">
              {button}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
