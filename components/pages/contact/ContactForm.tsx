"use client";
import { Button } from "@/components/button";
import { FloatingLabel } from "@/components/floating-label";
import Modal from "@/components/Modal";
import { MdMyLocation } from "react-icons/md";
import React, { useState } from "react";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [group, setGroup] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (value: string, id: string) => {
    switch (id) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "date":
        setDate(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "organization":
        setOrganization(value);
        break;
      case "group":
        setGroup(value);
        break;
      case "message":
        setMessage(value);
        break;
      default:
        break;
    }
  };

  // Quick set location handler
// Quick set location handler
const handleSetLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Use the OpenStreetMap Nominatim API to get location details
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            // Check if data is returned
            if (data && data.address) {
              // Get city name from the address
              const city = data.address.city || data.address.town || data.address.village || "Location found";
              setLocation(`${city} , ${data.display_name}`);
            } else {
              setLocation("Unable to retrieve location.");
            }
          })
          .catch((error) => {
            console.error("Error fetching address:", error);
            setLocation("Location found, but unable to retrieve address.");
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        setError("Unable to retrieve your location. Please ensure location services are enabled.");
      }
    );
  } else {
    setError("Geolocation is not supported by this browser.");
  }
};


  const validateForm = () => {
    const formErrors: { [key: string]: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName) formErrors.firstName = "First Name is required";
    if (!lastName) formErrors.lastName = "Last Name is required";
    if (!email || !emailPattern.test(email)) formErrors.email = "Invalid email";
    if (!location) formErrors.location = "Location is required";
    if (!phone) formErrors.phone = "Phone is required";
    if (!date) formErrors.date = "Invalid date";
    if (!organization) formErrors.organization = "Invalid organization";
    if (!group) formErrors.group = "Invalid group";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email: email,
          location: location,
          date: date,
          phone: phone,
          organization: organization,
          group: group,
          message: message || "noMessage",
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      setTitle("You demanded a private booking ");
      setDiscription(" We received your request !");
      setShow(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(
        error?.message.toString() || "An error occurred during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  const handelClose = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      {show && (
        <Modal
          onClose={handelClose}
          title={title!}
          description={description!}
          buttonDescription={"Accept"}
        />
      )}
      <form
        className="flex flex-col w-full mt-4 space-y-6"
        onSubmit={handleSubmit}
      >
        {/* First and Last Name */}
        <div className="flex flex-wrap justify-between gap-4">
          <div className="w-full sm:w-[38%]">
            <FloatingLabel
              input_name="First Name"
              type="text"
              id="firstName"
              value={firstName}
              onChange={(value) => handleChange(value, "firstName")}
              error={errors.firstName}
              className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
            />
          </div>
          <div className="w-full sm:w-[38%]">
            <FloatingLabel
              input_name="Last Name"
              type="text"
              className="border-t-0 border-l-0 border-r-0 rounded-none w-full "
              id="lastName"
              value={lastName}
              onChange={(value) => handleChange(value, "lastName")}
              error={errors.lastName}
            />
          </div>
        </div>
        {/* Email and Phone */}
        <div className="flex flex-wrap justify-between gap-4">
          <div className="w-full sm:w-[38%]">
            <FloatingLabel
              input_name="Email"
              type="email"
              id="email"
              value={email}
              onChange={(value) => handleChange(value, "email")}
              error={errors.email}
              className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
            />
          </div>
          <div className="w-full sm:w-[38%]">
            <FloatingLabel
              input_name="Phone"
              type="text"
              id="phone"
              value={phone}
              onChange={(value) => handleChange(value, "phone")}
              error={errors.phone}
              className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
            />
          </div>
        </div>
        {/* Location and Date */}
        <div className="flex flex-wrap justify-between gap-4">
          <div className="w-full sm:w-[38%] flex">
            <FloatingLabel
              input_name="Location"
              type="text"
              className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
              id="location"
              value={location}
              onChange={(value) => handleChange(value, "location")}
              error={errors.location}
            />
            <MdMyLocation onClick={handleSetLocation} className=" cursor-pointer">
            </MdMyLocation>
          </div>
          <div className="w-full sm:w-[38%]">
            <FloatingLabel
              input_name="Date"
              type="date"
              className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
              id="date"
              value={date}
              onChange={(value) => handleChange(value, "date")}
              error={errors.date}
            />
          </div>
        </div>
        {/* Organization and Group Number */}
        <div className="flex flex-wrap justify-between gap-4">
          <div className="w-full sm:w-[38%]">
            <FloatingLabel
              input_name="Organization Name"
              type="text"
              id="organization"
              value={organization}
              onChange={(value) => handleChange(value, "organization")}
              error={errors.organization}
              className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
            />
          </div>
          <div className="w-full sm:w-[38%]">
            <FloatingLabel
              input_name="Group Number"
              type="text"
              id="group"
              value={group}
              onChange={(value) => handleChange(value, "group")}
              error={errors.group}
              className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
            />
          </div>
        </div>
        {/* Message */}
        <div>
          <FloatingLabel
            input_name="Message"
            type="text"
            id="message"
            value={message}
            onChange={(value) => handleChange(value, "message")}
            className="border-t-0 border-l-0 border-r-0 rounded-none w-full"
          />
        </div>
        {/* Submit Button */}
        {error && (
          <div className="text-center text-red-500 mb-3 font-sans font-semibold">
            {error}
          </div>
        )}
        {/* Show general error message */}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#556D4C] to-[#97B08E] rounded-md hover:from-[#97B08E] hover:to-[#556D4C] transition-colors duration-300 "
          >
            {loading ? "Sending ..." : "Send"}
          </Button>
        </div>
      </form>
    </>
  );
}
