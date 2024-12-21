/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/tickets/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

// Helper function to extract media URLs
const getMediaUrls = (mediaData: any) => {
  if (!mediaData) return null;

  if (Array.isArray(mediaData) && mediaData.length > 0) {
    // Handle array of media
    return mediaData.map((media) => media.attributes?.url || null).filter(Boolean);
  } else if (mediaData?.attributes) {
    // Handle single media object
    return mediaData.attributes?.url || null;
  }
  return null;
};

// Helper function to convert rich text to plain text
const convertRichTextToPlain = (richText: any) => {
  if (!richText) return null;

  if (Array.isArray(richText)) {
    return richText.map((block) => block.children?.[0]?.text || "").join(" ");
  }
  return typeof richText === "string" ? richText : "";
};

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tickets?populate=photos,video,background,guidlines,description,location,timestamp=${Date.now()}`,
      {
        headers: {
          "Cache-Control": "no-cache", // Prevent caching
        },
      }
    );

    // Transform and map the data
    const tickets = response.data.data.map((ticket: any) => {
      return {
        id: ticket.id,
        name: ticket.attributes.name || "Unnamed Event",
        date: ticket.attributes.date || "No date provided",
        price: ticket.attributes.price || 0,
        guidelines: convertRichTextToPlain(ticket.attributes.guidlines), // Convert Rich Text
        location: ticket.attributes.location.features[0].geometry.coordinates || "No location provided",
        description: convertRichTextToPlain(ticket.attributes.description), // Convert Rich Text
        photos: getMediaUrls(ticket.attributes.photos?.data), // Array of media URLs
        video: getMediaUrls(ticket.attributes.video?.data), // Single video URL
        background: getMediaUrls(ticket.attributes.background?.data), // Single background URL
      };
    });

    return NextResponse.json(tickets, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching tickets:", error.message);

    return NextResponse.json(
      {
        message:
          error.response?.data?.error?.message || "Error fetching tickets",
      },
      { status: error.response?.status || 500 }
    );
  }
}
