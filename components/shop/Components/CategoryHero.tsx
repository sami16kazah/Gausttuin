// components/shop/ShopHero.tsx

import Image from "next/image";
import TipImage from "../../../public/images/category-tips.png";
import CategoryBackgroundImage from "../../../public/images/category-background.png";
import { BackGroundSection } from "../BackgroundSection";

const CategoryHero = () => {
  const title = "Wines from all over the world";
  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s";
  const button = " Explore more";

  return (
    <div className="flex flex-col w-full h-auto overflow-hidden">
      <BackGroundSection
        title={title}
        text={text}
        button={button}
        image={CategoryBackgroundImage.src}
      />
      <Image
        className="w-screen h-auto -m-1"
        src={TipImage}
        alt="Shop tips illustration"
      />
    </div>
  );
};

export default CategoryHero;
