import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const SANITY_REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET;

const TYPE_TO_TAG: Record<string, string> = {
  siteSettings: "sanity-siteSettings",
  navigation: "sanity-navigation",
  hero: "sanity-hero",
  service: "sanity-services",
  project: "sanity-projects",
  testimonial: "sanity-testimonials",
  testimonialStats: "sanity-testimonialStats",
  blogPost: "sanity-blogPosts",
  promise: "sanity-promises",
  aboutSection: "sanity-aboutSection",
  transformation: "sanity-transformation",
  turnkeyProcess: "sanity-turnkeyProcess",
  consultation: "sanity-consultation",
};

export async function POST(request: NextRequest) {
  if (!SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET not configured" },
      { status: 500 },
    );
  }

  const body = await request.json();
  const secret = request.headers.get("x-sanity-secret");

  if (secret !== SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const documentType = body._type as string | undefined;

  if (documentType && TYPE_TO_TAG[documentType]) {
    revalidateTag(TYPE_TO_TAG[documentType], "seconds:60");
  }

  revalidateTag("sanity", "seconds:60");
  revalidatePath("/", "page");

  return NextResponse.json({ revalidated: true, type: documentType });
}
