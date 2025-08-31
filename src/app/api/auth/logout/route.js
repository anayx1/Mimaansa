// src/app/auth/logout/route.js
import { NextResponse } from "next/server"

export async function POST() {
    console.log("🔴 Logout API endpoint hit!")

    try {
        const response = NextResponse.json({
            success: true,
            message: "Logged out successfully"
        })

        // Clear the admin session cookie
        response.cookies.set("admin-session", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 0, // Expire immediately
        })

        console.log("✅ Admin session cookie cleared")
        return response

    } catch (error) {
        console.error("❌ Logout error:", error)
        return NextResponse.json({
            success: false,
            message: "Server error"
        }, { status: 500 })
    }
}