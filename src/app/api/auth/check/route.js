// src/app/auth/check/route.js
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const sessionCookie = req.cookies.get("admin-session")
        
        if (sessionCookie && sessionCookie.value === "authenticated") {
            return NextResponse.json({ authenticated: true })
        }
        
        return NextResponse.json({ authenticated: false })
    } catch (error) {
        console.error("Auth check error:", error)
        return NextResponse.json({ authenticated: false }, { status: 500 })
    }
}