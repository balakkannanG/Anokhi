"use client";

import { useEffect, useState } from "react";

interface GoldRate {
  gold24kPer10g: number;
  gold22kPer10g: number;
  updatedAt: string;
}

function isGoldRate(value: unknown): value is GoldRate {
  if (typeof value !== "object" || value === null) return false;
  const rate = value as Record<string, unknown>;
  return (
    typeof rate.gold24kPer10g === "number" &&
    Number.isFinite(rate.gold24kPer10g) &&
    rate.gold24kPer10g > 0 &&
    typeof rate.gold22kPer10g === "number" &&
    Number.isFinite(rate.gold22kPer10g) &&
    rate.gold22kPer10g > 0 &&
    typeof rate.updatedAt === "string" &&
    Number.isFinite(Date.parse(rate.updatedAt))
  );
}

function formatRupees(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatUpdatedAt(value: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export function GoldRateTicker() {
  const [rate, setRate] = useState<GoldRate | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const loadRate = async () => {
      try {
        const response = await fetch("/api/gold-rate", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`Gold-rate service returned ${response.status}`);

        const payload: unknown = await response.json();
        if (!isGoldRate(payload)) throw new Error("Gold-rate service returned invalid rate data");
        if (active) {
          setRate(payload);
          setUnavailable(false);
        }
      } catch {
        if (active && !controller.signal.aborted) {
          setRate(null);
          setUnavailable(true);
        }
      }
    };

    void loadRate();
    const interval = window.setInterval(() => void loadRate(), 5 * 60 * 1000);

    return () => {
      active = false;
      controller.abort();
      window.clearInterval(interval);
    };
  }, []);

  if (!rate) {
    return (
      <p aria-live="polite" className="text-[11px] font-medium tracking-[0.06em] sm:text-xs">
        {unavailable ? "GOLD RATE TEMPORARILY UNAVAILABLE" : "FETCHING GOLD RATE…"}
      </p>
    );
  }

  const updatedAt = formatUpdatedAt(rate.updatedAt);
  return (
    <p
      aria-label={`Indicative gold spot estimate per 10 grams: 24 karat ${formatRupees(rate.gold24kPer10g)}, 22 karat ${formatRupees(rate.gold22kPer10g)}. Updated ${updatedAt} India time. Local prices may vary.`}
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.04em] sm:justify-start sm:text-xs"
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-muted-gold" />
      <span>GOLD / 10G</span>
      <span>24K {formatRupees(rate.gold24kPer10g)}</span>
      <span className="text-parchment/55">·</span>
      <span>22K {formatRupees(rate.gold22kPer10g)}</span>
      <span className="hidden text-parchment/70 md:inline">· Spot estimate, updated {updatedAt} IST</span>
      <span className="sr-only">Indicative global spot equivalent; local jeweller prices may vary.</span>
    </p>
  );
}
