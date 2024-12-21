/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/categories/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories?populate=photo,timestamp=${Date.now()}`
    );

    // Transform data
    const categories = response.data.data.map((category: any) => {
      const photoData = category.attributes.photo?.data;
      let photoUrl = null;

      if (photoData) {
        if (Array.isArray(photoData) && photoData.length > 0) {
          // Handle array of photos
          photoUrl =
            photoData[0]?.attributes?.formats?.thumbnail?.url ||
            photoData[0]?.attributes?.url;
        } else if (photoData.attributes) {
          // Handle single photo object
          photoUrl =
            photoData.attributes.formats?.thumbnail?.url ||
            photoData.attributes.url;
        }
      }

      return {
        id: category.id,
        name: category.attributes.name,
        photo: photoUrl || "default-photo-url", // Fallback URL
      };
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response?.data?.error?.message || "Error fetching categories" },
      { status: error.response?.status || 500 }
    );
  }
}
