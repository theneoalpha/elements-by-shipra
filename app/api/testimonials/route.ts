import { NextResponse } from "next/server";

import { writeClient } from "@/sanity/lib/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quote, name, role } = body;

    if (!quote || !name || !role) {
      return NextResponse.json(
        { error: "Missing required fields: quote, name, role" },
        { status: 400 },
      );
    }

    const token = process.env.SANITY_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Server not configured for writes" },
        { status: 500 },
      );
    }

    const result = await writeClient.create({
      _type: "testimonial",
      quote,
      name,
      role,
      approved: false,
    });

    return NextResponse.json({ success: true, id: result._id });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to submit testimonial",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
