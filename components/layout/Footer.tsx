import Link from "next/link";
import { Container, Logo } from "@/components/ui/primitives";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="survey-grid-dark bg-slate text-slate-ink">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo dark />
          <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed">
            Manual-first penetration testing for fintech, SaaS and regulated organisations in the {site.regions}.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block text-[0.95rem] font-semibold text-white underline decoration-slate-ink/40 hover:decoration-trail-bright"
          >
            Email the team
          </a>
        </div>
        <nav aria-label="Services" className="lg:col-span-3">
          <p className="coord mb-4 text-slate-ink/70">Services</p>
          <ul className="space-y-2.5 text-[0.95rem]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}/`} className="hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company" className="lg:col-span-2">
          <p className="coord mb-4 text-slate-ink/70">Company</p>
          <ul className="space-y-2.5 text-[0.95rem]">
            <li><Link href="/about/" className="hover:text-white">About</Link></li>
            <li><Link href="/insights/" className="hover:text-white">Insights</Link></li>
            <li><Link href="/contact/" className="hover:text-white">Contact</Link></li>
            <li><Link href="/about/#disclosure" className="hover:text-white">Responsible disclosure</Link></li>
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <p className="coord mb-4 text-slate-ink/70">Start</p>
          <Link
            href={site.primaryCta.href}
            className="inline-flex min-h-11 items-center whitespace-nowrap rounded-[5px] bg-trail px-4 text-[0.92rem] font-semibold text-white hover:bg-[#b82214]"
          >
            {site.primaryCta.label}
          </Link>
        </div>
      </Container>
      <div className="border-t border-slate-rule">
        <Container className="flex flex-col gap-2 py-6 text-[0.85rem] text-slate-ink/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.legalName}. Prototype: name, logo and credentials are placeholders.</p>
          <p className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
          </p>
        </Container>
      </div>
    </footer>
  );
}
