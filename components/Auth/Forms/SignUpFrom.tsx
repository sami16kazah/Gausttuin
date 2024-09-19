import React, { useState } from "react";
import { FloatingLabel } from "@/components/floating-label";
import { Button } from "@/components/button";
import { useRegisterUserMutation } from "@/store/apis/UsersApi";
import { useRouter } from "next/navigation";

const SignUpForm: React.FC = () => {
  // Define individual states for each input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [registerUser] = useRegisterUserMutation();
  const router = useRouter();

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
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "telephone":
        setTelephone(value);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const formErrors: { [key: string]: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName) formErrors.firstName = "First Name is required";
    if (!lastName) formErrors.lastName = "Last Name is required";
    if (!email || !emailPattern.test(email)) formErrors.email = "Invalid email";
    if (!password) formErrors.password = "Password is required";
    if (password !== confirmPassword)
      formErrors.confirmPassword = "Passwords do not match";
    if (!telephone) formErrors.telephone = "Invalid phone number";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting submission
    setError(null); // Clear any previous error

    if (!validateForm()) {
      setLoading(false); // Stop loading if form validation fails
      return;
    }

    try {
      await registerUser({
        username: `${firstName} ${lastName}`,
        email: email,
        password: password,
        phone: +telephone,
      }).unwrap();
      // Redirect or show success message here
      router.push("/auth/signin");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration failed", error!.data.error.message);
      setError(error!.data.error.message); // Set error message
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <FloatingLabel
              className="w-full"
              input_name="First Name"
              type="text"
              id="firstName"
              value={firstName}
              onChange={(value) => handleChange(value, "firstName")}
              error={errors.firstName}
            />
            <FloatingLabel
              className="w-full"
              input_name="Last Name"
              type="text"
              id="lastName"
              value={lastName}
              onChange={(value) => handleChange(value, "lastName")}
              error={errors.lastName}
            />
          </div>

          <FloatingLabel
            className="w-full"
            input_name="Email"
            type="email"
            id="email"
            value={email}
            onChange={(value) => handleChange(value, "email")}
            error={errors.email}
          />

          <FloatingLabel
            className="w-full"
            input_name="Password"
            type="password"
            id="password"
            value={password}
            onChange={(value) => handleChange(value, "password")}
            error={errors.password}
          />

          <FloatingLabel
            className="w-full"
            input_name="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(value) => handleChange(value, "confirmPassword")}
            error={errors.confirmPassword}
          />

          <FloatingLabel
            className="w-full"
            input_name="Telephone Number"
            type="tel"
            id="telephone"
            value={telephone}
            onChange={(value) => handleChange(value, "telephone")}
            error={errors.telephone}
          />
        </div>
        {loading && <div className="text-center mb-3">Loading...</div>}{" "}
        {/* Show loading indicator */}
        {error && (
          <div className="text-center text-red-500 mb-3">{error}</div>
        )}{" "}
        {/* Show general error message */}
        <Button
          className="rounded-lg w-full py-2 px-4 text-center mb-3"
          type="submit"
          disabled={loading} // Disable button while loading
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
