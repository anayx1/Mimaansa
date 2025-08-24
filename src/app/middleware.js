import { NextResponse } from "next/server"

export function middleware(request) {
    console.log("MIDDLEWARE HIT:", request.nextUrl.pathname)

    const { pathname } = request.nextUrl
    const sessionCookie = request.cookies.get("admin-session")
    console.log("Session cookie:", sessionCookie)

    if (pathname.startsWith("/admin")) {
        if (!sessionCookie || sessionCookie.value !== "authenticated") {
            console.log("Redirecting to /login")
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    if (pathname === "/login" && sessionCookie?.value === "authenticated") {
        console.log("Redirecting to /admin")
        return NextResponse.redirect(new URL("/admin", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
}
