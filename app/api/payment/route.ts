/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/signin/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { cartItems, couponCode, email, phone, location } =
    await req.json();
  if (!cartItems  || !email || !phone || !location) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/payment`,
      {
        cartItems,
        couponCode ,
        email,
        phone,
        location,
      }
    );

    // Set the JWT cookie
    const res = NextResponse.json(
      { paymentUrl: response.data.paymentUrl },
      { status: 200 }
    );
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response.data.error.message || " Invalid Checkout" },
      { status: error.response.data.error.status }
    );
  }
}
