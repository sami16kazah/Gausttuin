import React, { useState } from "react";
import { FloatingLabel } from "@/components/floating-label";
import { Button } from "@/components/button";
import Modal from "@/components/Modal"; // Assume you have a Modal component
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function ConfirmResetPasswordForm() {
  const searchParams = useSearchParams();
  const code = searchParams.get("reset");
  const [password, setPassword] = useState(""); // New password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password
  const [passwordError, setPasswordError] = useState(""); // Password validation error
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Confirm password validation error
  const [error, setError] = useState<string | null>(null); // General error
  const [loading, setLoading] = useState(false); // Loading state
  const [showModal, setShowModal] = useState(false); // Show modal state
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmPasswordError("");
    setError(null);
    setLoading(true);
    let isValid = true;

    // Validate password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      setLoading(false);
      isValid = false;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      setLoading(false);
      isValid = false;
    }

    if (!isValid) return;

    try {
      // Send new password to the backend
      const response = await fetch("/api/auth/resetpassword/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, code, confirmPassword }), // Only send the password since the email is already confirmed
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      // Show confirmation modal
      setShowModal(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error?.message || "An error occurred during password reset.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string, id: string) => {
    switch (id) {
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        {/* Password Field */}
        <FloatingLabel
          className={`mt-4 w-full mb-4 ${
            passwordError ? "border-red-500" : ""
          }`}
          input_name={"New Password"}
          type={"password"}
          value={password}
          onChange={(value) => handleChange(value, "password")}
        />
        {passwordError && (
          <div className="text-red-500 text-sm font-sans font-semibold mb-3">
            {passwordError}
          </div>
        )}

        {/* Confirm Password Field */}
        <FloatingLabel
          className={`mt-4 w-full mb-4 ${
            confirmPasswordError ? "border-red-500" : ""
          }`}
          input_name={"Confirm Password"}
          type={"password"}
          value={confirmPassword}
          onChange={(value) => handleChange(value, "confirmPassword")}
        />
        {confirmPasswordError && (
          <div className="text-red-500 text-sm font-sans font-semibold mb-3">
            {confirmPasswordError}
          </div>
        )}

        {/* Display error message from the API if exists */}
        {error && (
          <div className="text-red-500 text-sm font-sans mb-3 text-center font-semibold">
            {error}
          </div>
        )}

        {/* Reset Password Button */}
        <Button
          className="rounded-lg w-full py-2 px-3 text-center mb-3"
          disabled={loading}
          type="submit"
        >
          {loading ? "Resetting password..." : "Reset password"}
        </Button>
      </form>

      {/* Confirmation Modal */}
      {showModal && (
        <Modal
          onClose={() => {setShowModal(false); router.push('/auth/signin')  } }
          title="Password Reset"
          description="Your password has been successfully reset."
          buttonDescription="Ok"
        />
      )}
    </div>
  );
}
