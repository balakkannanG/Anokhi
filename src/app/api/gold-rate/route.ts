import { NextResponse } from "next/server";

interface GoldSpotResponse {
  price: number;
  updatedAt: string;
}

interface ExchangeRateResponse {
  date: string;
  rates: { INR: number };
}

function isGoldSpotResponse(value: unknown): value is GoldSpotResponse {
  if (typeof value !== "object" || value === null) return false;
  const result = value as Record<string, unknown>;
  return (
    typeof result.price === "number" &&
    Number.isFinite(result.price) &&
    result.price > 0 &&
    typeof result.updatedAt === "string" &&
    Number.isFinite(Date.parse(result.updatedAt))
  );
}

function isExchangeRateResponse(value: unknown): value is ExchangeRateResponse {
  if (typeof value !== "object" || value === null) return false;
  const result = value as Record<string, unknown>;
  if (typeof result.rates !== "object" || result.rates === null) return false;
  const rates = result.rates as Record<string, unknown>;
  return (
    typeof rates.INR === "number" &&
    Number.isFinite(rates.INR) &&
    rates.INR > 0 &&
    typeof result.date === "string" &&
    Number.isFinite(Date.parse(result.date))
  );
}

export async function GET() {
  try {
    const [goldResponse, exchangeResponse] = await Promise.all([
      fetch("https://api.gold-api.com/price/XAU", {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(8_000),
      }),
      fetch("https://api.frankfurter.dev/v1/latest?from=USD&to=INR", {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8_000),
      }),
    ]);

    if (!goldResponse.ok || !exchangeResponse.ok) {
      return NextResponse.json({ message: "Gold-rate providers are unavailable." }, { status: 502 });
    }

    const [goldPayload, exchangePayload]: [unknown, unknown] = await Promise.all([
      goldResponse.json(),
      exchangeResponse.json(),
    ]);
    if (!isGoldSpotResponse(goldPayload) || !isExchangeRateResponse(exchangePayload)) {
      return NextResponse.json({ message: "Gold-rate providers returned invalid data." }, { status: 502 });
    }

    const usdInr = exchangePayload.rates.INR;
    // XAU is quoted per troy ounce; convert to fine-gold INR per 10 grams.
    const fineGoldPer10g = (goldPayload.price * usdInr * 10) / 31.1034768;

    return NextResponse.json(
      {
        gold24kPer10g: Math.round(fineGoldPer10g),
        gold22kPer10g: Math.round(fineGoldPer10g * (22 / 24)),
        updatedAt: goldPayload.updatedAt,
      },
      {
        headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
      },
    );
  } catch {
    return NextResponse.json({ message: "Gold-rate providers could not be reached." }, { status: 502 });
  }
}
