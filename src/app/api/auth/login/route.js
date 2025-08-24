// /auth/login/route.js
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const response = NextResponse.json({ success: true })

            response.cookies.set("admin-session", "authenticated", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 2, // 2 hours
            })

            return response
        }

        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
    }
}
