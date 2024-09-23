import { NextResponse } from "next/server";
import axios from "axios";

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "No email was entered" }, 
        { status: 400 }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      return NextResponse.json(
        { message: "API URL not configured" }, 
        { status: 500 }
      );
    }

    // Send the POST request to the external API
    const res = await axios.post(`${apiUrl}/auth/forgot-password`, { email });

    // Check the API response
    const responseData = res.data;

    if (responseData.ok) {
      // The API returns a generic "ok: true", so we can't verify if the email exists
      return NextResponse.json(
        { message: "If the email exists, a reset link has been sent." }, 
        { status: res.status }
      );
    }

    // Fallback in case the API sends an unexpected response
    return NextResponse.json(
      { message: "Unexpected response from the server" }, 
      { status: 500 }
    );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage = error.response?.data?.error?.message || "Request failed";
    const errorStatus = error.response?.data?.error?.status || 500;

    return NextResponse.json(
      { message: errorMessage }, 
      { status: errorStatus }
    );
  }
};
