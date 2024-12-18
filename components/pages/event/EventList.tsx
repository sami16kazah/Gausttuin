/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { EventCard } from "@/components/pages/event/EventCard";
import { EventFeature } from "@/components/pages/event/EventFeature";
import React, { useEffect, useState } from "react";

export default function EventList() {
  const [events, setEvents] = useState<any[]>([]); // State to store products
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  async function fetchEventItems() {
    try {
      const response = await fetch(`/api/event/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache", // Ensure no cached response
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();

      // Transform the data
      return data;
    } catch (error) {
      console.error("Failed to fetch shop items:", error);
      return [];
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchEventItems();
        setEvents(items);
      } catch (err: any) {
        setError(err.message || "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <p>Loading Events...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return events.length > 0 ? (
    <EventFeature text={"Latest Events"}>
      {events.map((item: any) => (
        <EventCard
          key={item.id}
          id={item.id}
          name={item.name}
          date={item.date}
          price={item.price}
          location={item.location}
          description={item.description}
          background={item.background}
        />
      ))}
    </EventFeature>
  ) : (
    <p>No Available Products</p>
  );
}
