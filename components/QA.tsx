/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Accordion } from "./Accordion";
// Fetch questions by location
async function fetchQuestionsByLocation(location: string) {
  try {
    const response = await fetch(`/api/qa-questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location: location }),
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

interface QAProps {
  location: string;
}
const QA: React.FC<QAProps> = ({ location }) => {
  const [questions, setQuestions] = useState<any[]>([]); // State to store products
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchQuestionsByLocation(location);
        setQuestions(items);
      } catch (err: any) {
        setError(err.message || "Failed to fetch faq.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <p>Loading faq...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Format fetched items for Accordion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedItems = questions.map((item: any) => ({
    id: item.id,
    label: item.attributes.label,
    content: item.attributes.content,
  }));
  {
    /* Frequently Asked Questions */
  }
  return (
    <div>
      {formattedItems && formattedItems.length > 0 && (
        <>
          <div>
            <p
              className="text-xl font-medium font-sans text-center mt-10 text-black"
              style={{
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "1.5em",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                WebkitTextStroke: "0.5px white",
              }}
            >
              Frequently Asked Questions
            </p>
          </div>
          <Accordion items={formattedItems} />
        </>
      )}
    </div>
  );
};

export default QA;
