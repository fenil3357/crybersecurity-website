"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const drivers = ["SOC 2", "ISO 27001", "PCI DSS", "DORA", "NIS2", "HIPAA", "Customer request", "Release or launch", "Funding or M&A", "Other"];

type Errors = Partial<Record<"name" | "email" | "company" | "services", string>>;

const inputCls =
  "mt-1.5 block min-h-12 w-full rounded-[5px] border border-granite/20 bg-white px-4 text-[0.97rem] placeholder:text-muted focus:border-granite focus:outline-none aria-[invalid=true]:border-trail";

/** Front-end only in the prototype (static site): validates, then shows what happens next. Nothing is sent. */
/** Reads ?service=a,b&email=x from the hero starter or a service page. Wrap in <Suspense>. */
export function ScopingFormFromParams() {
  const q = useSearchParams();
  const svc = (q.get("service") ?? "").split(",").filter((s) => services.some((x) => x.slug === s));
  return <ScopingForm initialServices={svc} initialEmail={q.get("email") ?? ""} />;
}

export function ScopingForm({ initialServices = [], initialEmail = "" }: { initialServices?: string[]; initialEmail?: string }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({ name: "", email: initialEmail, company: "", role: "", driver: "", scope: "", env: "", date: "", region: "", notes: "" });
  const [picked, setPicked] = useState<string[]>(initialServices);
  const [errors, setErrors] = useState<Errors>({});
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // keep the new step or the confirmation in view and move focus to it
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = topRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 80) window.scrollBy({ top: top - 100, behavior: "smooth" });
    el.focus({ preventScroll: true });
  }, [step]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a work email, for example name@company.com";
    if (!form.company.trim()) e.company = "Enter your company name";
    if (!picked.length) e.services = "Choose at least one service, or pick VAPT if you are unsure";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  if (step === 3) {
    return (
      <div ref={topRef} tabIndex={-1} role="status" className="rounded-[8px] border border-granite/15 bg-paper p-6 outline-none sm:p-8">
        <span aria-hidden className="grid size-10 place-items-center rounded-full bg-trail text-white">
          <Check className="size-5" />
        </span>
        <h2 className="mt-5 text-[1.7rem] font-bold leading-tight tracking-[-0.025em]">Request received, {form.name.split(" ")[0]}</h2>
        <p className="mt-3 leading-relaxed text-granite-2">
          We will email {form.email} to arrange your scoping call and send a mutual NDA first if you need one.
        </p>
        <ul className="mt-6 space-y-2 text-[0.95rem]">
          {picked.map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 rotate-45 bg-trail" />
              {services.find((x) => x.slug === s)?.title}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[0.85rem] text-muted">Prototype: this form is not connected yet, so nothing was sent.</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step === 1) {
          if (validate()) setStep(2);
        } else setStep(3);
      }}
      className="rounded-[8px] border border-granite/15 bg-paper p-5 sm:p-8"
    >
      <div ref={topRef} tabIndex={-1} className="outline-none" />
      <p className="coord text-muted">Step {step} of 2 · {step === 1 ? "About you" : "About the scope (optional)"}</p>

      {step === 1 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Full name" error={errors.name}>
            <input id="name" autoComplete="name" value={form.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} className={inputCls} />
          </Field>
          <Field id="email" label="Work email" error={errors.email}>
            <input id="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} className={inputCls} />
          </Field>
          <Field id="company" label="Company" error={errors.company}>
            <input id="company" autoComplete="organization" value={form.company} onChange={set("company")} aria-invalid={!!errors.company} aria-describedby={errors.company ? "company-err" : undefined} className={inputCls} />
          </Field>
          <Field id="role" label="Role">
            <input id="role" autoComplete="organization-title" value={form.role} onChange={set("role")} className={inputCls} placeholder="For example CISO or CTO" />
          </Field>

          <fieldset className="sm:col-span-2" aria-describedby={errors.services ? "services-err" : undefined}>
            <legend className="text-[0.92rem] font-semibold">What needs testing?</legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {services.map((s) => {
                const on = picked.includes(s.slug);
                return (
                  <button
                    key={s.slug}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setPicked((p) => (on ? p.filter((x) => x !== s.slug) : [...p, s.slug]));
                      setErrors((er) => ({ ...er, services: undefined }));
                    }}
                    className={cn(
                      "inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-[0.88rem] font-medium transition-colors duration-150",
                      on ? "border-granite bg-granite text-white" : "border-granite/20 bg-white hover:border-granite/50",
                    )}
                  >
                    {on && <Check aria-hidden className="size-3.5" />}
                    {s.shortTitle}
                  </button>
                );
              })}
            </div>
            {errors.services && (
              <p id="services-err" className="mt-2 text-sm font-medium text-trail">
                {errors.services}
              </p>
            )}
          </fieldset>

          <Field id="driver" label="Main reason for testing" className="sm:col-span-2">
            <select id="driver" value={form.driver} onChange={set("driver")} className={inputCls}>
              <option value="">Choose one</option>
              {drivers.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field id="scope" label="Approximate scope" className="sm:col-span-2">
            <input id="scope" value={form.scope} onChange={set("scope")} className={inputCls} placeholder="For example 1 web app, 3 roles, 40 API endpoints" />
          </Field>
          <Field id="env" label="Environment">
            <select id="env" value={form.env} onChange={set("env")} className={inputCls}>
              <option value="">Choose one</option>
              <option>Staging</option>
              <option>Production</option>
              <option>Not sure yet</option>
            </select>
          </Field>
          <Field id="date" label="Target date">
            <input id="date" type="date" value={form.date} onChange={set("date")} className={inputCls} />
          </Field>
          <Field id="region" label="Region">
            <select id="region" value={form.region} onChange={set("region")} className={inputCls}>
              <option value="">Choose one</option>
              <option>United States</option>
              <option>Europe</option>
              <option>Both</option>
            </select>
          </Field>
          <Field id="notes" label="Anything else" className="sm:col-span-2">
            <textarea id="notes" rows={4} value={form.notes} onChange={set("notes")} className={cn(inputCls, "py-3")} />
          </Field>
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {step === 2 ? (
          <button type="button" onClick={() => setStep(1)} className="min-h-11 text-sm font-semibold text-granite-2 hover:text-granite">
            Back
          </button>
        ) : (
          <p className="text-[0.85rem] text-muted">We reply by email. Your details are used only to arrange the call.</p>
        )}
        <div className="flex flex-col gap-3 sm:flex-row">
          {step === 2 && (
            <button type="submit" className="min-h-12 rounded-[5px] border border-granite/25 px-5 text-[0.95rem] font-semibold hover:border-granite">
              Skip and send
            </button>
          )}
          <button
            type="submit"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[5px] bg-trail px-6 text-[0.95rem] font-semibold text-white shadow-[0_6px_16px_-6px_rgb(210_43_28/0.55)] hover:bg-[#b82214] active:scale-[0.97]"
          >
            {step === 1 ? "Continue" : site.primaryCta.label}
            <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({ id, label, error, className, children }: { id: string; label: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[0.92rem] font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-trail">
          {error}
        </p>
      )}
    </div>
  );
}
