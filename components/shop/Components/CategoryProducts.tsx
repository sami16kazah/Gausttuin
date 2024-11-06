/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"; // Server directive for Next.js
import { Feature } from "@/components/shop/Feature";
import { ProductCard } from "@/components/shop/ProductCard";

async function fetchShopItems(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shop-items?populate=Photo&filters[category][id][$eq]=${id}`,
      { cache: "no-store" } // No caching for fresh data
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    // Return the transformed data
    return data.data.map((item: any) => {
      const photoData = item.attributes.Photo?.data;
      const photoUrl =
        photoData && photoData.length > 0
          ? photoData[0].attributes.formats?.thumbnail?.url ||
            photoData[0].attributes.url
          : null;

      return {
        id: item.id,
        name: item.attributes.Name,
        price: item.attributes.Price,
        description: item.attributes.Description,
        photo: photoUrl || "default-photo-url", // Fallback URL
        date: item.attributes.Date,
        discount: item.attributes.Discount,
      };
    });
  } catch (error) {
    console.error("Failed to fetch shop items:", error);
    return [];
  }
}

interface CategoryProductsProps {
  id: string;
  name:string;
}

const CategoryProducts = async ({ id,name }: CategoryProductsProps) => {
  if (!id) {
    return <p>No category ID provided.</p>; // Provide feedback if no ID is found
  }

  const items = await fetchShopItems(id);

  return items.length > 0 ? (
    <Feature text={name}>
      {items.map((item: any) => (
        <ProductCard
         id={item.id}
          key={item.id}
          name={item.name}
          price={item.price}
          description={item.description}
          photo={item.photo} // Fallback handled in fetch function
          date={item.date}
          discount={item.discount}
        />
      ))}
    </Feature>
  ) : (
    <p>No Available Products</p>
  );
};

export default CategoryProducts;
