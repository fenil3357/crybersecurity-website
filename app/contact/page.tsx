import type { Metadata } from "next";
import { Container } from "@/components/ui/primitives";
import { Suspense } from "react";
import { ScopingForm, ScopingFormFromParams } from "@/components/contact/ScopingForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Scoping Call",
  description:
    "Book a scoping call with Varden to agree targets, timing and rules of engagement for your penetration test. NDA available before scoping.",
  alternates: { canonical: "/contact/" },
};

const onCall = [
  "What needs testing, and which user roles and environments",
  "Your deadline: audit window, release date or customer review",
  "Testing windows, exclusions and emergency contacts",
  "What the report needs to show, and who will read it",
];

const next = [
  { step: "We reply by email", body: "To arrange a time, and send a mutual NDA first if you want one." },
  { step: "Scoping call", body: "We agree targets, timing and rules of engagement." },
  { step: "Fixed proposal", body: "A written scope and price based on the call." },
];

export default function ContactPage() {
  return (
    <section className="survey-grid">
      <Container className="grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <h1 className="display text-[clamp(2.5rem,1.5rem+3.6vw,4.4rem)]">Book a scoping call</h1>
          <p className="lede mt-5 max-w-md">
            Tell us what you need tested and why. Two minutes here saves a round of emails later.
          </p>

          <h2 className="mt-12 text-[1.1rem] font-semibold">What we cover on the call</h2>
          <ul className="mt-4 space-y-3">
            {onCall.map((c) => (
              <li key={c} className="flex gap-3 leading-relaxed text-granite-2">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-trail" />
                {c}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-[1.1rem] font-semibold">What happens next</h2>
          <ol className="mt-4 border-l-2 border-trail/70 pl-6">
            {next.map((n, i) => (
              <li key={n.step} className="relative pb-6 last:pb-0">
                <span className="absolute -left-[2.05rem] top-0 grid size-5 place-items-center rounded-full border-2 border-trail bg-stone text-[0.62rem] font-bold">
                  {i + 1}
                </span>
                <p className="font-semibold">{n.step}</p>
                <p className="mt-1 text-[0.95rem] text-granite-2">{n.body}</p>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-[0.95rem] text-granite-2">
            Prefer email?{" "}
            <a href={`mailto:${site.email}`} className="font-semibold text-granite underline decoration-trail">
              {site.email}
            </a>
          </p>
        </div>

        <div className="lg:col-span-7">
          <Suspense fallback={<ScopingForm />}>
            <ScopingFormFromParams />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
