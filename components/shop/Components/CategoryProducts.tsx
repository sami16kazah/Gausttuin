/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Feature } from "@/components/shop/Feature";
import { ProductCard } from "@/components/shop/ProductCard";
import { useEffect, useState } from "react";

async function fetchShopItems(id: string) {
  try {
    const response = await fetch("/api/shop/categories/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    // Return the transformed data
    return data;
  } catch (error) {
    console.error("Failed to fetch shop items:", error);
    return [];
  }
}

interface CategoryProductsProps {
  id: string;
  name: string;
}

const CategoryProducts = ({ id, name }: CategoryProductsProps) => {
  const [items, setItems] = useState<any[]>([]); // State to store products
  const [loading, setLoading] = useState<boolean>(true); // State to track loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    if (!id) {
      setError("No category ID provided.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const items = await fetchShopItems(id);
        setItems(items);
      } catch (error: any) {
        setError(error.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Fetch data when `id` changes

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return items.length > 0 ? (
    <Feature text={name}>
      {items.map((item) => (
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
