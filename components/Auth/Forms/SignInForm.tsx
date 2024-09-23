import React, { useState } from "react";
import { FloatingLabel } from "@/components/floating-label";
import { Button } from "@/components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal"; // Assume you have a Modal component

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resending, setResending] = useState(false);
  const router = useRouter();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isPasswordStrong = (password: string) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setConfirmed(false);
    setPasswordError("");
    setError(null);
    setLoading(true);

    let isValid = true;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    }
    if (!isPasswordStrong(password)) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    }
    if (!isValid) return;

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      router.push("/home");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message.includes("confirmed")) {
        setConfirmed(true);
      }
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
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await fetch("/api/auth/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        cache: "no-cache",
      });
      setError(null); // Clear previous errors
      // You can replace this with a nicer notification
    } catch (error) {
      setError("Failed to resend the code. Please try again.");
    } finally {
      setResending(false);
      setShowModal(false);
      setError("Code resended to your email check your spam section");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <FloatingLabel
          className={`mt-4 w-full ${
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

        {/* Password Field */}
        <FloatingLabel
          className={`mt-4 w-full ${
            passwordError || error ? "border-red-500" : ""
          }`}
          input_name={"Password"}
          type={"password"}
          value={password}
          onChange={(value) => handleChange(value, "password")}
        />
        {passwordError && (
          <div className="text-red-500 text-sm font-sans font-semibold mb-3">
            {passwordError}
          </div>
        )}

        {/* Remember me and Forget Password */}
        <div className="flex justify-between items-center w-full mt-3 mb-4 text-sm">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 text-green-700"
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-gray-700">Remember me</span>
          </label>
          <Link
            href={"/forgetpassword"}
            className="text-green-700 hover:underline"
          >
            Forget Password?
          </Link>
        </div>

        {/* Display error message from the API if exists */}
        {error && (
          <div className="text-red-500 text-sm font-sans mb-3 text-center font-semibold">
            {error}
            {confirmed && (
              <div>
                <p
                  className="hover:text-red-700 cursor-pointer hover:underline"
                  onClick={() => setShowModal(true)}
                >
                  Resend the code
                </p>
              </div>
            )}
          </div>
        )}

        {/* Sign in Button */}
        <Button
          className="rounded-lg w-full py-2 px-3 text-center mb-3"
          disabled={loading}
          type="submit"
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Resend Confirmation Modal */}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          title="Resend Verification Code"
          description={`Are you sure you want to resend the verification code to ${email}?`}
          buttonDescription="Cancel"
        >
          <Button onClick={handleResend} disabled={resending}>
            {resending ? "Resending..." : "Resend Code"}
          </Button>
        </Modal>
      )}
    </div>
  );
}
