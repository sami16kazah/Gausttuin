/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/auth/signin/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { name , email ,date ,location ,phone, message, organization,group } = await req.json();

  if (!email || !date || !name || !location || !phone || !message || !organization || !group) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/contacts`,
      {
        data : {
        name:name,
        email:email,
        phone:phone,
        location:location,
        date:date,
        organization:organization,
        group:group,
        message:message
        }
      }
    );


    // Set the JWT cookie
    const res = NextResponse.json({ res: response.data }, { status: 200 });
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.response.data.error.message || "Login failed" },
      { status: error.response.data.error.status }
    );
  }
}
