import { NextRequest, NextResponse } from "next/server";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { createCustomer, createCustomerAccessToken } from "@/lib/shopify/customers";

interface CustomerApiPayload {
  customerCreate?: {
    customer?: { id: string } | null;
    customerUserErrors?: Array<{ field: string[] | null; message: string }>;
  };
  customerAccessTokenCreate?: {
    customerAccessToken?: { accessToken: string; expiresAt: string } | null;
    customerUserErrors?: Array<{ field: string[] | null; message: string }>;
  };
}

export async function POST(request: NextRequest) {
  if (!isShopifyConfigured) return NextResponse.json({ message: "Shopify customer accounts are not configured yet." }, { status: 503 });

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const action = body.action;
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!email || !password) return NextResponse.json({ message: "Enter your email and password." }, { status: 400 });

    if (action === "register") {
      const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
      const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
      if (!firstName || !lastName) return NextResponse.json({ message: "Enter your first and last name." }, { status: 400 });
      const result = await createCustomer({
        firstName,
        lastName,
        email,
        password,
        phone: typeof body.phone === "string" ? body.phone.trim() : undefined,
      }) as CustomerApiPayload;
      const errors = result.customerCreate?.customerUserErrors ?? [];
      if (errors.length) return NextResponse.json({ message: errors.map((error) => error.message).join(" ") }, { status: 422 });
      return NextResponse.json({ message: "Your account has been created. Sign in to continue." }, { status: 201 });
    }

    if (action === "login") {
      const result = await createCustomerAccessToken({ email, password }) as CustomerApiPayload;
      const access = result.customerAccessTokenCreate?.customerAccessToken;
      const errors = result.customerAccessTokenCreate?.customerUserErrors ?? [];
      if (errors.length || !access) return NextResponse.json({ message: errors.map((error) => error.message).join(" ") || "Unable to sign in." }, { status: 401 });
      const response = NextResponse.json({ message: "You are signed in." });
      response.cookies.set("anokhi-customer-token", access.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(access.expiresAt),
        path: "/",
      });
      return response;
    }

    return NextResponse.json({ message: "Unknown account action." }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Shopify could not complete this request. Please try again later." }, { status: 502 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ message: "You are signed out." });
  response.cookies.set("anokhi-customer-token", "", { httpOnly: true, path: "/", maxAge: 0, sameSite: "lax" });
  return response;
}