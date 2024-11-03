import Image from 'next/image';
import React from 'react'

interface CategoryCardProps {
    name: string;
    photo: string;
  }

  export const CategoryCard: React.FC<CategoryCardProps> = ({ name , photo})=>{
  return (
    <div className="bg-white border  rounded-md shadow-sm shadow-current  flex flex-col items-center justify-center m-2 h-72 w-60 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg">

      {/* Gradient Border */}
      <Image className='w-56 h-56' src={photo} alt='cat-photo' width={100} height={100}></Image>
      <p className='m-2 p-2 text-pretty font-bold font-sans text-xl text-center leading-tight text-[#556D4C]'>{name}</p>
    </div>
  )
}
