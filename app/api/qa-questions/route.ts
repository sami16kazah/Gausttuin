/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import axios from "axios";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const { location } = await req.json();
  if (!location) {
    return NextResponse.json(
      { message: "Location is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch products for the given category ID
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/qa-sections?filters[location][$eq]=${location}`
    );

    const data = response.data;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching fqa:", error.message);
    return NextResponse.json(
      {
        message:
          error.response?.data?.error?.message || "Error fetching fqa",
      },
      { status: error.response?.status || 500 }
    );
  }
}
