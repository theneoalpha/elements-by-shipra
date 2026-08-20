import { NextResponse } from "next/server";

import { writeClient } from "@/sanity/lib/client";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const quote = formData.get("quote") as string | null;
    const name = formData.get("name") as string | null;
    const role = formData.get("role") as string | null;

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

    const doc = {
      _type: "testimonial" as const,
      quote,
      name,
      role,
      approved: false,
      projectImage: undefined as
        | { _type: "image"; asset: { _ref: string } }
        | undefined,
    };

    const projectImage = formData.get("projectImage");
    if (projectImage instanceof File) {
      const asset = await writeClient.assets.upload("image", projectImage);
      doc.projectImage = {
        _type: "image",
        asset: { _ref: asset._id },
      };
    }

    const result = await writeClient.create(doc);

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
