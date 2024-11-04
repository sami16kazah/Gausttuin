// components/shop/ShopHero.tsx

import Image from "next/image";
import MainBackground from "@/components/shop/MainBackground";
import TipImage from "../../../public/images/shop-tips.png";

const ShopHero = () => {
  return (
    <div className="flex flex-col w-full h-auto overflow-hidden">
      <MainBackground />
      <Image
        className="w-screen h-auto -m-1"
        src={TipImage}
        alt="Shop tips illustration"
      />
    </div>
  );
};

export default ShopHero;
