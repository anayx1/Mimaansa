// middleware.js (in project root)
import { NextResponse } from "next/server"

export function middleware(request) {
    const { pathname } = request.nextUrl
    const sessionCookie = request.cookies.get("admin-session")
    
    console.log("Middleware running for:", pathname)
    
    // Only handle admin routes and login page - let everything else pass through
    if (pathname.startsWith("/admin")) {
        console.log("Checking admin access...")
        if (!sessionCookie || sessionCookie.value !== "authenticated") {
            console.log("No valid session - redirecting to login")
            return NextResponse.redirect(new URL("/login", request.url))
        }
        console.log("Valid session - allowing admin access")
        return NextResponse.next()
    }

    if (pathname === "/login") {
        console.log("Checking login page...")
        if (sessionCookie?.value === "authenticated") {
            console.log("Already authenticated - redirecting to admin")
            return NextResponse.redirect(new URL("/admin", request.url))
        }
        return NextResponse.next()
    }

    // For all other routes, just let them through
    return NextResponse.next()
}

export const config = {
    matcher: [
        // Only match admin routes and login page specifically
        "/admin",
        "/admin/(.*)",
        "/login"
    ],
}