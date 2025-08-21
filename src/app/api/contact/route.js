import clientPromise from "@/libs/mongodb";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

async function sendEmail(data) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465, // true for SSL
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Website Contact Form" <${process.env.SMTP_USER}>`,
            to: process.env.NOTIFY_TO, // client email
            subject: `New Contact Form Submission from ${data.fullName}`,
            text: `
New form entry:

Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company}
Website: ${data.website}
Country: ${data.country}
Category: ${data.productCategory}
Role: ${data.role}
Message: ${data.message}
      `,
        });

        console.log("✅ Email sent");
    } catch (err) {
        console.error("❌ Email error:", err);
    }
}

// src/app/api/contact/route.js
export async function POST(req) {
  try {
    const body = await req.json()
    const client = await clientPromise
    const db = client.db("your_database_name")
    const collection = db.collection("contacts")

    const doc = { ...body, createdAt: new Date() }
    const result = await collection.insertOne(doc)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("POST /api/contact error:", err)
    return new Response(JSON.stringify({ error: "Failed to save contact" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}



// Get all contact form entries
export async function GET() {
  try {
    const client = await clientPromise
const db = client.db("mimansaDb")   // ✅ use your actual DB name
    const collection = db.collection("contacts")

    const contacts = await collection.find({}).sort({ createdAt: -1 }).toArray()

    return new Response(JSON.stringify(contacts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("GET /api/contact error:", err)
    return new Response(JSON.stringify({ error: "Failed to fetch contacts" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

