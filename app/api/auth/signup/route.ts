/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { username, email, password, phone } = await req.json();
  if (!username || !email || !password || !phone) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
      {
        username,
        email,
        password,
        phone,
      }
    );

    return NextResponse.json({ user: response.data.user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response.data.error.message  || "Registration failed" },
      { status: 500 }
    );
  }
}
