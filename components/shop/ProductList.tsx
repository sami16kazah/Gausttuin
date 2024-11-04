import React, { FC } from "react";
import { ProductCard } from "./ProductCard";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  photo: string;
  description: string;
  date: string;
  discount?: string;
}

interface ProductListProps {
  items: ProductCardProps[];
}

export const ProductList: FC<ProductListProps> = ({ items }) => {
  const renderedItems = items.map((item) => (
    <ProductCard
      key={item.id}
      name={item.name}
      price={item.price}
      photo={item.photo} // Provide fallback photo
      description={item.description}
      date={item.date}
      discount={item.discount}
    />
  ));

  return {renderedItems};
};
