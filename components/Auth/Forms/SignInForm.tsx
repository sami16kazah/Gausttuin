import React, { useState } from "react";
import { FloatingLabel } from "@/components/floating-label";
import { Button } from "@/components/button";
import Link from "next/link";
import { useLoginMutation } from "@/store/apis/UsersApi";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");;
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("formSubmitted");
    console.log(e.target);
    e.preventDefault();
    try {
      const userData = await login({ identifier: email, password }).unwrap();
      localStorage.setItem("jwt", userData.jwt);
      router.push("/auth/signup");
    } catch (error) {
      console.log("Failed to login");
    }
  };


  return (
    <div className="w-full ">
      <form onSubmit={handleSubmit}>
        {/* Email and Password fields */}
        <FloatingLabel
          className=" mt-4 w-full"
          input_name={"Email"}
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FloatingLabel
          className=" mt-4 w-full"
          input_name={"Password"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember me and Forget Password */}
        <div className="flex justify-between items-center w-full mt-3 mb-4 text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-green-700" />
            <span className="text-gray-700">Remember me</span>
          </label>
          <Link
            href={"/forgetpassword"}
            className="text-green-700 hover:underline"
          >
            Forget Password?
          </Link>
        </div>

        {/* Display error message if exists */}
        {error && (
          <div className="text-red-500 text-sm font-sans mb-3 text-center">
              {"Invalid Credantials !"}
          </div>
        )}

        {/* Sign in Button */}
        <Button
          className="rounded-lg w-full py-2 px-3 text-center mb-3"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
