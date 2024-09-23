/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/signin/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { email, password, rememberMe } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
      {
        identifier:email,
        password,
      }
    );

    const jwt = response.data.jwt; // Assume the JWT is in response.data.jwt

    // Set cookie options based on rememberMe
    const cookieOptions = {
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60, // 30 days if rememberMe, otherwise 1 hour
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      path: '/', // Available across the entire site
    };

    // Set the JWT cookie
    const res = NextResponse.json({ user: response.data.user }, { status: 200 });
    res.cookies.set('token', jwt, cookieOptions);

    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response.data.error.message || "Login failed" },
      { status: error.response.data.error.status }
    );
  }
}
