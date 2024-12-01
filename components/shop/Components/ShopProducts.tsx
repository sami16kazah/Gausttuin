/* eslint-disable @typescript-eslint/no-explicit-any */
// components/shop/ShopProducts.tsx
"use client";

import { useEffect, useState } from "react";
import { Feature } from "@/components/shop/Feature";
import { ProductCard } from "@/components/shop/ProductCard";

async function fetchShopItems() {
  try {
    const response = await fetch(`/api/shop/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache", // Ensure no cached response
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    // Transform the data
    return data;
  } catch (error) {
    console.error("Failed to fetch shop items:", error);
    return [];
  }
}

const ShopProducts = () => {
  const [products, setProducts] = useState<any[]>([]); // State to store products
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchShopItems();
        setProducts(items);
      } catch (err: any) {
        setError(err.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return products.length > 0 ? (
    <Feature text="Products">
      {products.map((item: any) => (
        <ProductCard
          id={item.id}
          key={item.id}
          name={item.name}
          price={item.price}
          description={item.description}
          photo={item.photo} // Fallback already handled in fetch logic
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
