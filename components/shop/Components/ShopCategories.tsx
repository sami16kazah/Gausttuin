/* eslint-disable @typescript-eslint/no-explicit-any */
// components/shop/ShopProducts.tsx
"use client";

import { Feature } from "@/components/shop/Feature";
import { CategoryCard } from "../CategoryCard";
import Link from "next/link";
import { useEffect, useState } from "react";

async function fetchShopCategories() {
  try {
    const response = await fetch("/api/shop/categories", {
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

    // Return the transformed data
    return data;
  } catch (error) {
    console.error("Failed to fetch shop categories:", error);
    return [];
  }
}

const ShopCategories = () => {
  const [categories, setCategories] = useState<any[]>([]); // State for categories
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShopCategories();
        setCategories(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures fetch happens once on mount

  if (loading) {
    return <p>Loading categories...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return categories.length > 0 ? (
    <Feature text="Categories">
      {categories.map((category: any) => (
        <Link
          key={category.id}
          href={`/shop/category?id=${category.id}&name=${category.name}`}
        >
          <CategoryCard
            key={category.id}
            name={category.name}
            photo={category.photo || "default-category-photo"} // Fallback for missing photos
          />
        </Link>
      ))}
    </Feature>
  ) : (
    <p>No Available Categories</p>
  );
};

export default ShopCategories;
