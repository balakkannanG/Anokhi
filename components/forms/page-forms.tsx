"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");

  return (
    <div className="w-full max-w-lg">
      <form
        className="flex w-full flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("Email sign-up will be available when the store mailing list is connected.");
        }}
      >
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          className="min-h-12 min-w-0 flex-1 border-b border-[var(--line)] bg-transparent px-1 text-[13px] text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-[var(--anokhi)] focus:outline-none"
        />
        <button className="min-h-12 bg-[var(--anokhi)] px-5 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]">
          Join the list
        </button>
      </form>
      <p role="status" className="mt-3 min-h-5 text-[11px] leading-5 text-[var(--muted)]">{message}</p>
    </div>
  );
}

export function ContactForm() {
  const [message, setMessage] = useState("");

  return (
    <form
      id="contact-form"
      className="grid gap-5 sm:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("Message delivery is not connected yet. Please contact Anokhi directly once contact details are confirmed.");
      }}
    >
      <Field label="Your name" name="name" autoComplete="name" />
      <Field label="Email address" name="email" type="email" autoComplete="email" />
      <label className="grid gap-2 text-[12px] sm:col-span-2">
        <span>How can we help?</span>
        <textarea
          name="message"
          required
          rows={5}
          className="resize-y border border-[var(--line)] bg-white px-4 py-3 text-[13px] outline-none focus:border-[var(--anokhi)]"
        />
      </label>
      <div className="sm:col-span-2">
        <button className="min-h-12 bg-[var(--anokhi)] px-6 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]">
          Send message
        </button>
        <p role="status" className="mt-3 min-h-5 text-[12px] text-[var(--muted)]">{message}</p>
      </div>
    </form>
  );
}

export function CustomerForm({ mode }: { mode: "login" | "register" }) {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const isRegister = mode === "register";

  return (
    <form
      className="grid gap-5"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        if (isRegister && form.get("password") !== form.get("confirmPassword")) {
          setMessage("Passwords do not match.");
          return;
        }
        setPending(true);
        setMessage("");
        try {
          const response = await fetch("/api/account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: mode,
              email: form.get("email"),
              password: form.get("password"),
              firstName: form.get("firstName"),
              lastName: form.get("lastName"),
              phone: form.get("phone"),
            }),
          });
          const result = (await response.json()) as { message?: string };
          setMessage(result.message || (response.ok ? "Your request is complete." : "Unable to complete your request."));
        } catch {
          setMessage("Unable to reach Shopify. Please try again later.");
        } finally {
          setPending(false);
        }
      }}
    >
      {isRegister && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First name" name="firstName" autoComplete="given-name" />
          <Field label="Last name" name="lastName" autoComplete="family-name" />
        </div>
      )}
      {isRegister && <Field label="Phone" name="phone" type="tel" autoComplete="tel" required={false} />}
      <Field label="Email address" name="email" type="email" autoComplete="email" />
      <Field label="Password" name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} />
      {isRegister && <Field label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" />}
      {!isRegister && (
        <label className="flex items-center gap-2 text-[12px] text-[var(--muted)]">
          <input name="remember" type="checkbox" className="accent-[var(--anokhi)]" />
          Remember me
        </label>
      )}
      <button disabled={pending} className="min-h-12 bg-[var(--anokhi)] px-6 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60">
        {pending ? "Please wait" : isRegister ? "Create account" : "Sign in"}
      </button>
      <p role="status" className="min-h-5 text-[12px] text-[var(--muted)]">{message}</p>
    </form>
  );
}

export function RingSizeConverter() {
  const [circumference, setCircumference] = useState("");
  const millimetres = Number(circumference);
  const approximateDiameter = millimetres > 0 ? (millimetres / Math.PI).toFixed(1) : "";

  return (
    <div className="grid max-w-md gap-3">
      <label htmlFor="ring-circumference" className="text-[12px] font-medium">Finger circumference (mm)</label>
      <input
        id="ring-circumference"
        type="number"
        min="30"
        max="90"
        step="0.1"
        value={circumference}
        onChange={(event) => setCircumference(event.target.value)}
        className="min-h-12 border border-[var(--line)] bg-white px-4 text-[14px] outline-none focus:border-[var(--anokhi)]"
      />
      <p aria-live="polite" className="min-h-6 text-[13px] text-[var(--muted)]">
        {approximateDiameter ? `Approximate inside diameter: ${approximateDiameter} mm. Confirm your size with Anokhi before ordering.` : "Enter a measurement to see an approximate inside diameter."}
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-[12px]">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="min-h-12 border border-[var(--line)] bg-white px-4 text-[13px] outline-none focus:border-[var(--anokhi)]"
      />
    </label>
  );
}