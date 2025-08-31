//app/api/contact/route.js
import clientPromise from "@/libs/mongodb";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Get the database name from environment variable with fallback
const DB_NAME = process.env.MONGODB_DB || "mimansaDb";

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

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8f9fa; line-height: 1.6;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        
        <!-- Header -->
        <div style="background-color: #000000; padding: 32px 40px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">
                New Contact Submission
            </h1>
            <p style="color: #e5e7eb; margin: 8px 0 0 0; font-size: 14px;">
                From ${data.fullName}
            </p>
        </div>

        <!-- Content -->
        <div style="padding: 40px;">
            
            <!-- Contact Info Section -->
            <div style="margin-bottom: 32px;">
                <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 20px 0; padding-bottom: 8px; border-bottom: 2px solid #f3f4f6;">
                    Contact Information
                </h2>
                
                <div style="display: grid; gap: 16px;">
                    <div style="display: flex; align-items: center;">
                        <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px; font-weight: 500;">Name:</span>
                        <span style="color: #111827; font-weight: 600;">${data.fullName}</span>
                    </div>
                    
                    <div style="display: flex; align-items: center;">
                        <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px; font-weight: 500;">Email:</span>
                        <a href="mailto:${data.email}" style="color: #000000; text-decoration: none; font-weight: 500; border-bottom: 1px solid #e5e7eb;">${data.email}</a>
                    </div>
                    
                    <div style="display: flex; align-items: center;">
                        <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px; font-weight: 500;">Phone:</span>
                        <a href="tel:${data.phone}" style="color: #000000; text-decoration: none; font-weight: 500;">${data.phone}</a>
                    </div>
                    
                    <div style="display: flex; align-items: center;">
                        <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px; font-weight: 500;">Company:</span>
                        <span style="color: #111827; font-weight: 500;">${data.company}</span>
                    </div>
                    
                    ${data.website ? `
                    <div style="display: flex; align-items: center;">
                        <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px; font-weight: 500;">Website:</span>
                        <a href="${data.website}" style="color: #000000; text-decoration: none; font-weight: 500; border-bottom: 1px solid #e5e7eb;">${data.website}</a>
                    </div>
                    ` : ''}
                    
                    <div style="display: flex; align-items: center;">
                        <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px; font-weight: 500;">Country:</span>
                        <span style="color: #111827; font-weight: 500;">${data.country}</span>
                    </div>
                </div>
            </div>

            <!-- Business Info Section -->
            <div style="margin-bottom: 32px;">
                <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 20px 0; padding-bottom: 8px; border-bottom: 2px solid #f3f4f6;">
                    Business Details
                </h2>
                
                <div style="display: grid; gap: 16px;">
                    <div style="display: flex; align-items: center;">
                        <span style="display: inline-block; width: 120px; color: #6b7280; font-size: 14px; font-weight: 500;">Category:</span>
                        <span style="background-color: #f9fafb; color: #111827; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 500; text-transform: capitalize;">${data.productCategory}</span>
                    </div>
                    
                    <div style="display: flex; align-items: center;">
                        <span style="display: inline-block; width: 120px; color: #6b7280; font-size: 14px; font-weight: 500;">Role:</span>
                        <span style="background-color: ${data.role === 'buyer' ? '#f0f9ff' : '#f0fdf4'}; color: ${data.role === 'buyer' ? '#0369a1' : '#15803d'}; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 600; text-transform: capitalize;">${data.role}</span>
                    </div>
                </div>
            </div>

            <!-- Message Section -->
            <div style="margin-bottom: 32px;">
                <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #f3f4f6;">
                    Message
                </h2>
                <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #000000;">
                    <p style="color: #374151; margin: 0; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${data.message}</p>
                </div>
            </div>

            <!-- Timestamp -->
            <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                    Received on ${new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
                This is an automated notification from your website contact form.
            </p>
        </div>
    </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"Mimaansa Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_TO,
      subject: `✨ New Contact: ${data.fullName} (${data.role})`,
      html: htmlContent,
      text: `
New Contact Form Submission

Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company}
Website: ${data.website || 'Not provided'}
Country: ${data.country}
Category: ${data.productCategory}
Role: ${data.role}

Message:
${data.message}

Received: ${new Date().toLocaleString()}
      `
    });

    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Email error:", err.message);
    console.error("Full error:", err);
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