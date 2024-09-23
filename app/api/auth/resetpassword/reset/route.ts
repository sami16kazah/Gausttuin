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
      passwordConfirmation: confirmPassword,
    });

    // Check if the request was successful
    if (res.status !== 200) {
      return NextResponse.json(
        { message: "Failed to reset password." },
        { status: res.status }
      );
    }

    return NextResponse.json(
      { message: "Your password has been successfully reset." },
      { status: 200 }
    );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let errorMessage = "An unexpected error occurred.";
    let errorStatus = 500;

    // Check if it's a response error from axios
    if (error.response) {
      errorStatus = error.response.status || 500;

      // Check if the response contains a message
      if (error.response.data) {
        if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (Array.isArray(error.response.data.message)) {
          errorMessage = error.response.data.message[0]?.messages[0]?.message || errorMessage;
        }
      }
    }

    return NextResponse.json(
      { message: errorMessage },
      { status: errorStatus }
    );
  }
};
