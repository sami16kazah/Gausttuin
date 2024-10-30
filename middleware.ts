// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from 'jose'; // Import jwtVerify from jose

// Define your JWT secret key (should match the one used in your Strapi backend)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your_default_secret');

// Define which paths should be protected
const protectedPaths = ["/shop"]; // Add any routes that need protection

export async function middleware(request: NextRequest) {
  // Check if the request path is one of the protected paths
  if (protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    // Check if the cookie exists
    const token = request.cookies.get("token");

    if (!token) {
      // Redirect to the login page if the token is not present
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    try {
      // Verify and decode the token using jose
      const { payload } = await jwtVerify(token.value, JWT_SECRET);
      console.log('Decoded token:', payload);
      const response = NextResponse.next();
      response.headers.set('X-Is-Logged-In', 'true'); // Set header for logged in
      return response; // Optionally log the decoded payload
    } catch (error) {
      // If token verification fails, redirect to login
      console.error('Token verification failed:', error);
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }

  // Allow the request to continue if the token exists and is valid, or path is not protected
  return NextResponse.next();
}

// You can also define the config to specify which routes the middleware applies to
export const config = {
  matcher: ["/shop/:path*"], // Update these paths based on your app
};
