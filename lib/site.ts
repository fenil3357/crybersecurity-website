// Single source of truth for brand-level facts.
// "Varden" is a placeholder name coined for the prototype; swap it here when the client confirms.
export const site = {
  name: "Varden",
  legalName: "Varden Security",
  url: "https://varden.example",
  email: "hello@varden.example",
  tagline: "Manual-first penetration testing for fintech and SaaS",
  description:
    "Manual-first penetration testing for fintech, SaaS and regulated organisations in the US and Europe. Exploitable findings, clear fixes, free retesting and evidence your auditors accept.",
  regions: "United States and Europe",
  primaryCta: { label: "Book a scoping call", href: "/contact/" },
  sampleCta: { label: "See a sample finding", href: "/#sample-finding" },
} as const;

export const nav = [
  { label: "Services", href: "/services/" },
  { label: "Industries", href: "/#industries" },
  { label: "About", href: "/about/" },
  { label: "Insights", href: "/insights/" },
] as const;

export const standards = [
  { name: "OWASP WSTG", scope: "Web" },
  { name: "OWASP ASVS", scope: "Web" },
  { name: "OWASP MASVS", scope: "Mobile" },
  { name: "OWASP API Top 10", scope: "API" },
  { name: "PTES", scope: "Network" },
  { name: "NIST SP 800-115", scope: "All" },
  { name: "CVSS v4", scope: "Scoring" },
] as const;

export const frameworks = [
  { id: "soc2", name: "SOC 2", note: "Penetration test evidence for Type I and Type II audits." },
  { id: "iso27001", name: "ISO 27001", note: "Technical vulnerability management evidence under Annex A." },
  { id: "pci", name: "PCI DSS v4", note: "Internal and external testing under requirement 11.4." },
  { id: "dora", name: "DORA", note: "Testing evidence for EU financial entities and their ICT providers." },
  { id: "nis2", name: "NIS2", note: "Evidence for assessing the effectiveness of security measures." },
  { id: "hipaa", name: "HIPAA", note: "Technical safeguard testing for health data platforms." },
] as const;
