/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      { message: "Category ID is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch products for the given category ID
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/shop-items?populate=Photo&filters[category][id][$eq]=${id}`
    );

    // Transform the product data
    const products = response.data.data.map((product: any) => {
      const photoData = product.attributes.Photo?.data;
      const photoUrl =
        photoData && photoData.length > 0
          ? photoData[0].attributes.formats?.thumbnail?.url ||
            photoData[0].attributes.url
          : null;

      return {
        id: product.id,
        name: product.attributes.Name,
        price: product.attributes.Price,
        description: product.attributes.Description,
        photo: photoUrl || "default-photo-url", // Fallback photo URL
        date: product.attributes.Date,
        discount: product.attributes.Discount,
      };
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    return NextResponse.json(
      {
        message:
          error.response?.data?.error?.message || "Error fetching products",
      },
      { status: error.response?.status || 500 }
    );
  }
}
