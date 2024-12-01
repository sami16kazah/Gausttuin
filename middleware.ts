// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Import jwtVerify from jose

// Define your JWT secret key (should match the one used in your Strapi backend)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your_default_secret"
);

// Define which paths should be protected
const protectedPaths = ["/none"]; // Add any routes that need protection

const checkedPaths = ["/auth"];

export async function middleware(request: NextRequest) {
  // Check if the request path is one of the protected paths
  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    // Check if the cookie exists
    const AuthToken = request.cookies.get("token");
    const UserToken = request.cookies.get("user");
    if (!AuthToken || !UserToken) {
      // Redirect to the login page if the token is not present
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    try {
      // Verify and decode the token using jose
      await jwtVerify(AuthToken.value, JWT_SECRET);
      const user = JSON.parse(UserToken.value);
      const response = NextResponse.next();
      response.headers.set("X-Is-Logged-In", "true");
      response.headers.set("X-name", user.name);
      response.headers.set("X-email", user.email); // Set header for logged in
      return response; // Optionally log the decoded payload
    } catch (error) {
      // If token verification fails, redirect to login
      console.error("Token verification failed:", error);
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  } else if (
    checkedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    // Check if the cookie exists
    const AuthToken = request.cookies.get("token");
    const UserToken = request.cookies.get("user");
    if (!AuthToken || !UserToken) {
      // Redirect to the login page if the token is not present
      return;
    }
    try {
      // Verify and decode the token using jose
      await jwtVerify(AuthToken.value, JWT_SECRET);
      const user = JSON.parse(UserToken.value);
      const response = NextResponse.next();
      response.headers.set("X-Is-Logged-In", "true");
      response.headers.set("X-name", user.name);
      response.headers.set("X-email", user.email); // Set header for logged in
      return NextResponse.redirect(new URL("/home", request.url)); // Optionally log the decoded payload
    } catch (error) {
      // If token verification fails, redirect to login
      console.error("Token verification failed:", error);
      return;
    }
  } else {
    const UserToken = request.cookies.get("user");
    const response = NextResponse.next();
    if (!UserToken) {
      return response;
    }
    const user = JSON.parse(UserToken.value);
    response.headers.set("X-name", user.name);
    response.headers.set("X-email", user.email); // Set header for logged in
    return response;
  }

  // Allow the request to continue if the token exists and is valid, or path is not protected
  return NextResponse.next();
}

// You can also define the config to specify which routes the middleware applies to
export const config = {
  matcher: ["/(.*)"], // Update these paths based on your app
};
