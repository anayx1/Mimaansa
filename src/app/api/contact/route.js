import clientPromise from "@/libs/mongodb";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Get the database name from environment variable with fallback
const DB_NAME = process.env.MONGODB_DB || "mimansaDb";

async function sendEmail(data) {
  try {
    let transporter = nodemailer.createTransporter({
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

// POST - Create new contact form entry
export async function POST(req) {
  try {
    // Validate request body
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection("contacts");

    // Create document with timestamp
    const doc = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert document
    const result = await collection.insertOne(doc);

    // Send notification email (don't wait for it to complete)
    if (body.email && body.fullName) {
      sendEmail(body).catch(err =>
        console.error("Email sending failed:", err)
      );
    }

    return NextResponse.json(
      {
        success: true,
        insertedId: result.insertedId
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("POST /api/contact error:", err);

    // Return different error messages based on error type
    if (err.name === 'MongoServerError') {
      return NextResponse.json(
        { error: "Database connection failed. Please try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to save contact form submission" },
      { status: 500 }
    );
  }
}

// GET - Retrieve all contact form entries
export async function GET() {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const collection = db.collection("contacts");

    // Fetch all contacts with proper error handling
    const contacts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(1000) // Add reasonable limit
      .toArray();

    // Convert MongoDB ObjectId to string for JSON serialization
    const serializedContacts = contacts.map(contact => ({
      ...contact,
      _id: contact._id.toString()
    }));

    return NextResponse.json(serializedContacts, { status: 200 });

  } catch (err) {
    console.error("GET /api/contact error:", err);

    // Return different error messages based on error type
    if (err.name === 'MongoServerError') {
      if (err.code === 8000) {
        return NextResponse.json(
          {
            error: "Database authentication failed. Please check your credentials.",
            details: "MongoDB Atlas authentication error"
          },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { error: "Database connection failed. Please try again later." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch contact form submissions" },
      { status: 500 }
    );
  }
}