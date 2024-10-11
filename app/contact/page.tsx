"use server"; // This directive indicates that the following code runs on the server side
import { Accordion } from "@/components/Accordion";
import Navbar from "@/components/pages/Navbar";
import dynamic from "next/dynamic";

// Lazy load component with Next.js dynamic import
const LazyComponent = dynamic(() => import("@/components/pages/Footer/Footer"), {
  loading: () => <p>Loading...</p>, // You can define a fallback UI while loading
  ssr: false, // Set to false if you don't want server-side rendering
});


// Fetch data with correct filtering
async function fetchQuestionsByLocation(location: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/qa-sections?filters[location][$eq]=${location}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data; // Access the data property in the response
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Use async function for data fetching
export default async function Page() {
  // Fetch data from the API
  const locationValue = "contact"; // Set the desired location value
  const items = await fetchQuestionsByLocation(locationValue); // Fetch questions based on location
  // Ensure the items are formatted correctly for Accordion
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedItems = items.map((item: any) => ({
    id: item.id, 
    label: item.attributes.label, 
    content: item.attributes.content, 
  }));

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* New Background using Gradient and Shape Elements */}
          <div className="relative flex justify-center items-center w-full h-96 bg-cover bg-[url(/images/ContactUs.png)] bg-center">
          <div className="absolute bg-orange-500 opacity-25 h-96 w-full"></div>

            {/* Decorative Wave Element at the Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-white rounded-t-full"></div>

            {/* Contact Us Title */}
            <p
              className="relative text-white text-7xl font-mono z-10 mb-10 mr-auto ml-10"
              style={{
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "105px",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                WebkitTextStroke: "2px black",
              }}
            >
              Contact Us
            </p>
          </div>

          <div className=" flex flex-col justify-center items-center">
            <p className="text-5xl text-orange-300 font-semibold">Get In Touch</p>
            <p className="text-3xl text-black text-center font-thin w-3/4 m-2">Got a question or want to plan the perfect event with us? we are here to help make your experience unforgettable!</p>
            <div className="relative shadow-lg rounded-md w-96 h-96"></div>
          </div>

          {/* Pass the formatted items array to the Accordion */}
          {formattedItems && (
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
        </main>
        <LazyComponent />
      </div>
    </>
  );
}
