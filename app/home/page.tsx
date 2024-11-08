"use client"; // Only use 'use client' if you are using React hooks

import Footer from "@/components/pages/Footer/Footer";
import Navbar from "@/components/pages/Navbar";
import { useEffect ,useState} from "react";
import { useSearchParams } from "next/navigation";
import Modal from "@/components/Modal";

export default function Page() {
  const [showModel,setShowModel]=useState<boolean>(false);
  const searchParams = useSearchParams()
  const show= searchParams.get('show');
  const title = searchParams.get('title');
  const description = searchParams.get('message');

  useEffect(() => {
    if (show !== null) {
      setShowModel(show === "true"); // Convert string to boolean
    }
  }, [show]);

  const handelClose = () => {
    setShowModel((prev) => !prev);
    localStorage.removeItem('cart');
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
        <main className="flex-grow">{/* Your main content goes here */}</main>
        <Footer />
      </div>
    </>
  );
}
