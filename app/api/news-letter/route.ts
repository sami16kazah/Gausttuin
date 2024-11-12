import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  // Validate the email format
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/news-letters`, {
      data: {
        email,
      },
    });
    return NextResponse.json({
      message: `Congratulations! You have successfully subscribed to our newsletter.`,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response.data.error.message || "Internal Server Error" },
      { status: error.response?.status || 500 }
    );
  }
}
