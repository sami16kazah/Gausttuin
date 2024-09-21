import React, { useState } from "react";
import { FloatingLabel } from "@/components/floating-label";
import { Button } from "@/components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading,setLoading]=useState(false);
  const router = useRouter();

  // Regex to check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to validate password strength (you can customize this)
  const isPasswordStrong = (password: string) => {
    return password.length >= 8; // Example rule: password must be at least 8 characters long
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
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
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          rememberMe: rememberMe, // Add this line
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      router.push('/home'); // Redirect after successful login
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
      case "password":
        setPassword(value);
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
          className={`mt-4 w-full ${
            emailError || error ? "border-red-500" : ""
          }`} // Add red border if emailError exists
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
          }`} // Add red border if passwordError exists
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
    </div>
  );
}
