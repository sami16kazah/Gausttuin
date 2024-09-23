import { NextResponse } from "next/server";
import axios from "axios";

export const POST = async (req: Request) => {
  try {
    const { password, confirmPassword, code } = await req.json();

    // Validate inputs
    if (!password || !confirmPassword || !code) {
      return NextResponse.json(
        { message: "Password, confirmation, and reset token are required." }, 
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match." }, 
        { status: 400 }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      return NextResponse.json(
        { message: "API URL not configured." }, 
        { status: 500 }
      );
    }

    // Send the POST request to Strapi's reset-password endpoint
    const res = await axios.post(`${apiUrl}/auth/reset-password`, {
      code, // Reset password token
      password,
      passwordConfirmation: confirmPassword
    });

    // If the request was successful
    return NextResponse.json(
      { message: "Your password has been successfully reset." }, 
      { status: res.status }
    );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage = error.response?.data?.message[0]?.messages[0]?.message || "Request failed";
    const errorStatus = error.response?.status || 500;

    return NextResponse.json(
      { message: errorMessage }, 
      { status: errorStatus }
    );
  }
};
