/* eslint-disable @typescript-eslint/no-explicit-any */
// components/shop/ShopProducts.tsx
"use server";
import { Feature } from "@/components/shop/Feature";
import { CategoryCard } from "../CategoryCard";
import Link from "next/link";

async function fetchShopCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories?populate=photo`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.data.map((item: any) => {
      // Safely access photo URL
      const photoData = item.attributes.photo?.data;
      const photoUrl =
        photoData && photoData.length > 0
          ? photoData[0].attributes.formats?.thumbnail?.url ||
            photoData[0].attributes.url
          : null;

      return {
        id: item.id,
        name: item.attributes.name,
        photo: photoUrl, // Full URL for the photo
      };
    });
  } catch (error) {
    console.error("Failed to fetch shop items:", error);
    return [];
  }
}

const ShopCategories = async () => {
  const items = await fetchShopCategories();
  return items.length > 0 ? (
    <Feature text="Categories">
      {items.map((item: any) => (
        <Link
          key={item.id}
          href={`/shop/category?id=${item.id}&name=${item.name}`}
        >
          <CategoryCard
            key={item.id}
            name={item.name}
            photo={item.photo} // Fallback for missing photos
          />
        </Link>
      ))}
    </Feature>
  ) : (
    <p>No Available Categories</p>
  );
};

export default ShopCategories;
