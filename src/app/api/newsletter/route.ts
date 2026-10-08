import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({ email: z.string().trim().email().max(254) });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
  }

  const endpoint = process.env.NEWSLETTER_API_URL;
  const token = process.env.NEWSLETTER_API_KEY;
  if (!endpoint || !token) {
    return NextResponse.json({ message: "Newsletter signup is not connected yet." }, { status: 503 });
  }

  let destination: URL;
  try {
    destination = new URL(endpoint);
  } catch {
    return NextResponse.json({ message: "Newsletter service configuration is invalid." }, { status: 503 });
  }
  if (destination.protocol !== "https:") {
    return NextResponse.json({ message: "Newsletter service configuration is invalid." }, { status: 503 });
  }

  try {
    const response = await fetch(destination, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: parsed.data.email }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      return NextResponse.json({ message: "We could not complete the signup. Please try again later." }, { status: 502 });
    }
    return NextResponse.json({ message: "Thank you for subscribing." });
  } catch {
    return NextResponse.json({ message: "We could not complete the signup. Please try again later." }, { status: 502 });
  }
}
