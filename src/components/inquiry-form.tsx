"use client";

import { useSearchParams } from "next/navigation";
import { useState, type ReactNode } from "react";
import { blueprints, tiers } from "@/lib/planner";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const budgets = ["Not sure yet", "Under $10k", "$10k to $50k", "$50k to $150k", "Over $150k"];
const timelines = ["As soon as possible", "In the next 3 months", "In 3 to 6 months", "Just exploring"];
const serviceOptions = [...services.map((service) => ({ id: service.id, name: service.name })), { id: "unsure", name: "Not sure yet" }];

const field =
  "w-full rounded-lg border border-line-strong bg-surface px-3.5 text-[0.9375rem] transition-colors placeholder:text-muted/70 hover:border-muted focus:border-fg";

type Initial = { service?: string; plan?: string; size?: string };

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium">
        {label}
        {hint && <span className="font-normal text-muted"> {hint}</span>}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function Select({ name, defaultValue, options }: { name: string; defaultValue?: string; options: string[] }) {
  return (
    <span className="relative block">
      <select name={name} defaultValue={defaultValue ?? options[0]} className={`${field} h-11 appearance-none pr-10`}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/**
 * The project inquiry. Sending opens the visitor's email app with the
 * message written out, so there is no backend to run.
 */
export function InquiryForm({ initial = {} }: { initial?: Initial }) {
  const [sent, setSent] = useState(false);
  const plan = blueprints.find((item) => item.id === initial.plan)?.label;
  const size = tiers[Number(initial.size)]?.label;

  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const service = serviceOptions.find((option) => option.id === value("service"))?.name ?? "Not sure yet";
    const company = value("company");

    const subject = `Project inquiry: ${service}${company ? ` for ${company}` : ""}`;
    const body = [
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      ...(company ? [`Company: ${company}`] : []),
      `Looking for: ${service}`,
      `Building: ${value("plan")}`,
      `Users: ${value("size")}`,
      `Budget: ${value("budget")}`,
      `Timeline: ${value("timeline")}`,
      "",
      value("details"),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={send} className="space-y-8">
      <fieldset>
        <legend className="text-sm font-medium">What do you need?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {serviceOptions.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-line-strong bg-surface px-4 py-3 text-[0.9375rem] transition-colors hover:border-muted has-checked:border-brand-sky has-checked:bg-brand-sky has-checked:text-on-brand has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-sky"
            >
              <input
                type="radio"
                name="service"
                value={option.id}
                defaultChecked={option.id === (initial.service ?? "build")}
                className="sr-only"
              />
              {option.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="What are you building?">
          <Select name="plan" defaultValue={plan} options={[...blueprints.map((item) => item.label), "Something else"]} />
        </Field>
        <Field label="How many people will use it?">
          <Select name="size" defaultValue={size} options={[...tiers.map((item) => item.label), "Not sure yet"]} />
        </Field>
        <Field label="Budget">
          <Select name="budget" options={budgets} />
        </Field>
        <Field label="When do you want to start?">
          <Select name="timeline" options={timelines} />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name">
          <input name="name" required autoComplete="name" className={`${field} h-11`} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required autoComplete="email" className={`${field} h-11`} />
        </Field>
        <Field label="Company" hint="(optional)">
          <input name="company" autoComplete="organization" className={`${field} h-11`} />
        </Field>
      </div>

      <Field label="Tell us about the project">
        <textarea
          name="details"
          required
          rows={6}
          placeholder="What are you building, who uses it, and where does it strain?"
          className={`${field} resize-y py-3 leading-relaxed`}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" className="btn-primary cursor-pointer">
          Send inquiry
        </button>
        <p className="text-sm text-muted" aria-live="polite">
          {sent ? (
            <>
              Your email app should now have the message ready to send. Nothing opened? Email{" "}
              <a href={`mailto:${site.email}`} className="text-fg underline underline-offset-4">
                {site.email}
              </a>
              .
            </>
          ) : (
            "This opens your email app with everything filled in."
          )}
        </p>
      </div>
    </form>
  );
}

/** The form prefilled from the planner's query string (?service=&plan=&size=). */
export function PrefilledInquiryForm() {
  const params = useSearchParams();
  return (
    <InquiryForm
      initial={{
        service: params.get("service") ?? undefined,
        plan: params.get("plan") ?? undefined,
        size: params.get("size") ?? undefined,
      }}
    />
  );
}
