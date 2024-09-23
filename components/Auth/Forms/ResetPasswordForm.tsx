import React, { useState } from "react";
import { FloatingLabel } from "@/components/floating-label";
import { Button } from "@/components/button";
import Modal from "@/components/Modal"; // Assume you have a Modal component

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setError(null);
    setLoading(true);
    let isValid = true;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
      setLoading(false);
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await fetch("/api/auth/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      setShowModal(true);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.message.toString() || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string, id: string) => {
    switch (id) {
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <FloatingLabel
          className={`mt-4 w-full mb-4 ${
            emailError || error ? "border-red-500" : ""
          }`}
          input_name={"Email"}
          type={"email"}
          value={email}
          onChange={(value) => handleChange(value, "email")}
        />
        {emailError && (
          <div className="text-red-500 text-sm font-sans font-semibold mb-3">
            {emailError}
          </div>
        )}

        {/* Display error message from the API if exists */}
        {error && (
          <div className="text-red-500 text-sm font-sans mb-3 text-center font-semibold">
            {error}
          </div>
        )}

        {/* Sign in Button */}
        <Button
          className="rounded-lg w-full py-2 px-3 text-center mb-3"
          disabled={loading}
          type="submit"
        >
          {loading ? "Reseting password..." : "Reset password"}
        </Button>
      </form>

      {/* Resend Confirmation Modal */}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          title="Reset Passowrd "
          description={`A reset code has been sent to ${email}. Please check your inbox.`}
          buttonDescription="Ok"
        ></Modal>
      )}
    </div>
  );
}
