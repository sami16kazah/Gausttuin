/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/signin/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { code } = await req.json();
  if (!code) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/coupon/validate`,
      {
        code: code,
      }
    );

    // Set the JWT cookie
    const res = NextResponse.json(
      { message: response.data.message, discount: response.data.discount },
      { status: 200 }
    );
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response.data.error.message || " Invalid Coupon" },
      { status: error.response.data.error.status }
    );
  }
}
