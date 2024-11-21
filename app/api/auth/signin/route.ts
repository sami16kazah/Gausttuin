/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/signin/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { email, password, rememberMe } = await req.json();
  const LowerCaseEmail = email.toLowerCase();
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
        identifier: LowerCaseEmail,
        password,
      }
    );

    const jwt = response.data.jwt; // Assume the JWT is in response.data.jwt

    // Set cookie options based on rememberMe
    const cookieOptions = {
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60, // 30 days if rememberMe, otherwise 1 hour
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      path: "/", // Available across the entire site
    };

    // Fetch user information from Strapi based on email
    const userInfoResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users?filters[$and][0][email][$eq]=${LowerCaseEmail}`
    );

    // Ensure userInfo is extracted properly
    const userInfo = userInfoResponse.data[0]; // Assuming the response is an array of users
    if (!userInfo) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Create user data object to store in cookie
    const userData = {
      name: userInfo.username,
      email: userInfo.email,
    };

    // Set the JWT cookie
    const res = NextResponse.json(
      { user: response.data.user },
      { status: 200 }
    );

    // Set the cookies
    res.cookies.set("token", jwt, cookieOptions);
    res.cookies.set("user", JSON.stringify(userData), {
      ...cookieOptions,
      httpOnly: false, // Allow access to the user cookie from client-side (if necessary)
    });

    return res;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    return NextResponse.json(
      { message: error.response?.data.error.message || "Login failed" },
      { status: error.response?.data.error.status || 500 }
    );
  }
}
