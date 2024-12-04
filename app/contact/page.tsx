"use server"; // Server directive for Next.js

import ContactCard from "@/components/pages/contact/ContactCard";
import ContactForm from "@/components/pages/contact/ContactForm";
import Navbar from "@/components/pages/Navbar";
import QA from "@/components/QA";
import dynamic from "next/dynamic";

// Lazy load Footer component
const LazyComponent = dynamic(() => import("@/components/pages/Footer/Footer"), {
  loading: () => <p>Loading...</p>,
  ssr: false, // No server-side rendering
});



// Page component
export default async function Page() {

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
              className="relative text-white text-5xl font-mono z-10 mb-10 mr-auto ml-10"
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

          {/* Outer Card with Contact Form and Contact Card */}
          <div className="flex flex-col items-center mt-10">
            <p className="text-5xl text-orange-300 font-semibold mb-4">Get In Touch</p>
            <p className="text-3xl text-black text-center font-thin w-3/4 mb-6">
              Got a question or want to plan the perfect event with us? We are here to help make your experience unforgettable!
            </p>

            {/* Outer Card Container */}
            <div className="relative shadow-lg rounded-lg w-4/5 bg-white p-8 mb-10">
              <div className="w-full h-full flex flex-col md:flex-row justify-around gap-6">
                {/* Contact Card */}
                <div className="w-full md:w-1/2">
                  <ContactCard />
                </div>

                {/* Contact Form */}
                <div className="w-full md:w-1/2">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>

          <QA location="contact"></QA>
        </main>
        <LazyComponent />
      </div>
    </>
  );
}
