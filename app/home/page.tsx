"use client"; // Only use 'use client' if you are using React hooks

import Footer from "@/components/pages/Footer/Footer";
import Navbar from "@/components/pages/Navbar";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Modal from "@/components/Modal";
import Breif from "../../public/images/what-we-have.png";
import Image from "next/image";
import QA from "@/components/QA";
import EventList from "@/components/pages/event/EventList";
import HomeBackground from "@/components/HomeBackground";

export default function Home() {
  const [showModel, setShowModel] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const show = searchParams.get("show");
  const title = searchParams.get("title");
  const description = searchParams.get("message");

  useEffect(() => {
    if (show !== null) {
      setShowModel(show === "true"); // Convert string to boolean
    }
  }, [show]);

  const handelClose = () => {
    setShowModel((prev) => !prev);
    localStorage.removeItem("cart");
  };

  return (
    <>
      {showModel && (
        <Modal
          onClose={handelClose}
          title={title!}
          description={description!}
          buttonDescription={"Accept"}
        ></Modal>
      )}
      <Navbar />

      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <HomeBackground></HomeBackground>
          <EventList></EventList>
          <Image src={Breif} alt="breif"></Image>
          <QA location="home"></QA>
        </main>
        <Footer />
      </div>
    </>
  );
}
