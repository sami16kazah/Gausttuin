import { NextResponse } from "next/server";
import axios from "axios";
export const POST = async (req: Request) => {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "No email was intered" },
      { status: 400 }
    );
  }
  try {
    await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/auth/send-email-confirmation",  {
        email:email
      }
    );
    const res = NextResponse.json(
      { message: "check your email please" },
      { status: 200 }
    );
    return res;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.response.data.error.message ||
          "Resending Confirmation Message failed",
      },
      { status: error.response.data.error.status }
    );
  }
};
