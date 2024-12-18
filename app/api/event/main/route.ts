/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/tickets/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

// Helper function to handle errors
const handleError = (error: any) => {
  console.error("Error fetching main event:", error.message);
  return NextResponse.json(
    {
      message:
        error.response?.data?.error?.message || "Error fetching main event",
    },
    { status: error.response?.status || 500 }
  );
};

export async function GET(request: Request) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/main-events?populate[event][populate]=background`
    );

    const mainEventData = response.data.data;
    // Check if data exists
    if (!mainEventData) {
      return NextResponse.json(
        { message: "No main events found" },
        { status: 404 }
      );
    }
    console.log(
      mainEventData[0].attributes.event.data.attributes.background.data
        .attributes.url
    );
    // Transform and map the data
    const mainEvent = {
      id: mainEventData[0].id,
      title: mainEventData[0].attributes.title,
      description: mainEventData[0].attributes.description,
      button_name: mainEventData[0].attributes.button_name,
      event: {
        id: mainEventData[0].attributes.event?.data?.id || "No event ID",
        name:
          mainEventData[0].attributes.event?.data?.attributes?.name ||
          "Unnamed Event",
        date:
          mainEventData[0].attributes.event?.data?.attributes?.date ||
          "No date provided",
        price: mainEventData[0].attributes.event?.data?.attributes?.price || 0,
        guidelines:
          mainEventData[0].attributes.event?.data?.attributes?.guidelines || "",
        location:
          mainEventData[0].attributes.event?.data?.attributes?.location || [],
        description:
          mainEventData[0].attributes.event?.data?.attributes?.description ||
          "",
        background:
          mainEventData[0].attributes.event.data.attributes.background.data
            .attributes.url || "No background provided",
      },
    };

    return NextResponse.json(mainEvent, { status: 200 });
  } catch (error: any) {
    return handleError(error);
  }
}
