/* eslint-disable @typescript-eslint/no-explicit-any */
// components/shop/ShopProducts.tsx
"use server"
import { Feature } from "@/components/shop/Feature";
import { ProductCard } from "@/components/shop/ProductCard";
async function fetchShopItems() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/shop-items?populate=Photo`,
        { cache: "no-store" }
      );
  
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data.data.map((item: any) => {
        // Safely access photo URL
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
          photo: photoUrl, // Full URL for the photo
          date: item.attributes.Date,
          discount: item.attributes.Discount,
        };
      });
    } catch (error) {
      console.error("Failed to fetch shop items:", error);
      return [];
    }
  }

const  ShopProducts = async () => {
    const items = await fetchShopItems();
  return items.length > 0 ? (
    <Feature text="Products">
      {items.map((item:any) => (
        <ProductCard
          key={item.id}
          name={item.name}
          price={item.price}
          description={item.description}
          photo={item.photo || "default-photo-url"} // Fallback for missing photos
          date={item.date}
          discount={item.discount}
        />
      ))}
    </Feature>
  ) : (
    <p>No Available Products</p>
  );
};

export default ShopProducts;
