export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "list"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: "Compliance" | "Application security" | "API security" | "Mobile" | "Network" | "Buying guides";
  date: string; // ISO
  readingTime: string;
  tldr: string[];
  relatedService: string; // service slug
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "does-soc-2-require-a-penetration-test",
    title: "Does SOC 2 require a penetration test?",
    description:
      "What the SOC 2 criteria actually say about penetration testing, what auditors expect to see, and how to scope a test that produces useful evidence.",
    category: "Compliance",
    date: "2026-11-12",
    readingTime: "7 min read",
    tldr: [
      "The SOC 2 criteria do not name penetration testing, but most auditors expect it as evidence for CC4.1 and CC7.1.",
      "Scope the test around the systems in your audit boundary, not your whole company.",
      "A retest report showing fixed findings is often more persuasive than the original report.",
    ],
    relatedService: "web-application-penetration-testing",
    body: [
      { type: "h2", id: "short-answer", text: "The short answer" },
      {
        type: "p",
        text: "The AICPA Trust Services Criteria do not contain the words penetration test. In practice, almost every SOC 2 auditor will ask how you evaluate your controls and monitor for vulnerabilities, and a recent third-party penetration test is the most common and most convincing answer.",
      },
      { type: "h2", id: "criteria", text: "Which criteria a pentest supports" },
      {
        type: "table",
        head: ["Criterion", "What it asks", "How a pentest helps"],
        rows: [
          ["CC4.1", "Evaluate whether controls are present and functioning", "Independent testing of the controls protecting the system"],
          ["CC7.1", "Detect vulnerabilities and configuration changes", "Evidence that vulnerabilities are identified and tracked"],
          ["CC7.2", "Monitor system components for anomalies", "Shows whether attacks during the test were detected"],
          ["CC8.1", "Manage changes to infrastructure and software", "Testing after major releases demonstrates change control"],
        ],
      },
      { type: "h2", id: "scope", text: "How to scope it for your audit" },
      {
        type: "p",
        text: "Start from your system description. The applications, APIs and infrastructure inside your audit boundary are the minimum scope. For most SaaS companies that means the customer-facing web application, its APIs and the cloud environment that hosts them.",
      },
      {
        type: "list",
        items: [
          "Test the production application or a staging environment that mirrors it.",
          "Include every user role, especially admin and multi-tenant boundaries.",
          "Schedule the test early in your observation window so there is time to fix and retest.",
          "Ask for an executive summary your auditor can read without the technical appendix.",
        ],
      },
      {
        type: "callout",
        title: "Timing tip",
        text: "For a Type II audit, a test early in the observation period, followed by a retest, shows both that you look for problems and that you fix them.",
      },
      { type: "h2", id: "evidence", text: "What auditors want to see" },
      {
        type: "p",
        text: "Auditors look for three things: the test was performed by a qualified independent party, the scope covered the in-scope system, and findings were tracked to resolution. The report and the retest letter cover the first two. Your ticketing system covers the third.",
      },
    ],
  },
  {
    slug: "bola-and-idor-in-fintech-apis",
    title: "BOLA and IDOR in fintech APIs: how they happen",
    description:
      "Broken object level authorisation is the top API risk for a reason. Here is how it shows up in fintech APIs and how to fix it at the source.",
    category: "API security",
    date: "2026-10-28",
    readingTime: "9 min read",
    tldr: [
      "BOLA happens when an API trusts the object ID the caller sends without checking ownership.",
      "Sequential IDs make it easier to find, but random IDs alone do not fix it.",
      "Fix it with a central authorisation check on every object lookup.",
    ],
    relatedService: "api-security-review",
    body: [
      { type: "h2", id: "what", text: "What BOLA looks like" },
      {
        type: "p",
        text: "Broken object level authorisation, often called IDOR, is number one on the OWASP API Security Top 10. The pattern is simple: an endpoint takes an object identifier from the request and returns or changes that object without checking that it belongs to the caller.",
      },
      {
        type: "code",
        lang: "http",
        code: "GET /api/v2/accounts/10482/transactions HTTP/1.1\nAuthorization: Bearer <token for account 10481>\n\nHTTP/1.1 200 OK\n{ \"account\": 10482, \"transactions\": [ ... ] }",
      },
      { type: "h2", id: "why-fintech", text: "Why fintech APIs are exposed" },
      {
        type: "list",
        items: [
          "Mobile apps call fine-grained endpoints for accounts, cards, payees and statements.",
          "Partner and open banking APIs add new callers with different trust levels.",
          "Microservices pass IDs between each other and assume the caller was already checked.",
        ],
      },
      { type: "h2", id: "fix", text: "How to fix it at the source" },
      {
        type: "p",
        text: "Move the ownership check into one place that every data access path goes through, such as a repository layer or policy engine, rather than repeating it in each controller.",
      },
      {
        type: "code",
        lang: "ts",
        code: "async function getAccount(user: User, accountId: string) {\n  const account = await db.accounts.find(accountId);\n  if (!account || account.ownerId !== user.id) {\n    throw new NotFound(); // do not reveal that it exists\n  }\n  return account;\n}",
      },
      {
        type: "callout",
        title: "Testing tip",
        text: "Test with two accounts in the same role and swap their identifiers on every request. Automated scanners rarely do this because they do not understand ownership.",
      },
    ],
  },
  {
    slug: "how-to-scope-a-penetration-test",
    title: "How to scope a penetration test and what drives cost",
    description:
      "A practical guide to scoping a penetration test: what to include, what information testers need, and the factors that change duration and price.",
    category: "Buying guides",
    date: "2026-10-09",
    readingTime: "6 min read",
    tldr: [
      "Scope follows risk: start with what holds customer data or moves money.",
      "Duration depends on roles, workflows and endpoints more than on page count.",
      "Good preparation, such as test accounts and documentation, shortens the engagement.",
    ],
    relatedService: "vulnerability-assessment-penetration-testing",
    body: [
      { type: "h2", id: "start", text: "Start with the reason for testing" },
      {
        type: "p",
        text: "A test for a SOC 2 audit, a test before a launch and a test requested by an enterprise customer can each need a different scope. Write down the reason first, then list the systems that reason covers.",
      },
      { type: "h2", id: "drivers", text: "What drives duration and cost" },
      {
        type: "table",
        head: ["Factor", "Why it matters"],
        rows: [
          ["Number of user roles", "Each role multiplies the authorisation checks to perform"],
          ["Business workflows", "Payments, approvals and onboarding need manual logic testing"],
          ["API endpoints", "Each endpoint needs authorisation and input testing"],
          ["Environments and platforms", "iOS, Android and web are tested separately"],
          ["Network size", "IP ranges and Active Directory complexity set internal effort"],
        ],
      },
      { type: "h2", id: "prepare", text: "What to prepare before the scoping call" },
      {
        type: "list",
        items: [
          "A short architecture overview or diagram.",
          "The list of applications, APIs and IP ranges you want covered.",
          "Test accounts for each role, or a plan to create them.",
          "Any deadlines, such as an audit date or a customer review.",
        ],
      },
      {
        type: "callout",
        title: "On the call",
        text: "Expect to discuss targets, roles, environments, testing windows and rules of engagement. You should leave with a clear proposal, not a vague estimate.",
      },
    ],
  },
  {
    slug: "dora-threat-led-testing-vs-penetration-testing",
    title: "DORA threat-led testing vs a standard pentest",
    description:
      "What DORA asks of EU financial entities and their ICT providers, and how threat-led penetration testing differs from a standard penetration test.",
    category: "Compliance",
    date: "2026-09-18",
    readingTime: "8 min read",
    tldr: [
      "DORA requires regular digital operational resilience testing for EU financial entities.",
      "Threat-led penetration testing applies to entities identified by their regulator, not to everyone.",
      "A standard penetration test programme is still the foundation most firms need.",
    ],
    relatedService: "network-penetration-testing",
    body: [
      { type: "h2", id: "what-dora", text: "What DORA asks for" },
      {
        type: "p",
        text: "The Digital Operational Resilience Act applies across EU financial services from January 2025. It requires a testing programme that includes vulnerability assessments, network security assessments and penetration testing, proportionate to the size and risk of the entity.",
      },
      { type: "h2", id: "tlpt", text: "Where threat-led testing fits" },
      {
        type: "p",
        text: "Threat-led penetration testing, or TLPT, is an intelligence-led red team exercise against live production systems. Regulators identify which entities must perform it, typically larger and more systemic firms. Check current guidance from your competent authority before planning one.",
      },
      {
        type: "table",
        head: ["", "Standard penetration test", "Threat-led penetration test"],
        rows: [
          ["Who needs it", "Most financial entities and ICT providers", "Entities identified by the regulator"],
          ["Scope", "Defined applications, APIs or networks", "Critical functions on live production"],
          ["Approach", "Find and prove vulnerabilities", "Emulate a specific threat actor end to end"],
          ["Frequency", "Regular programme, often yearly", "Set by the regulatory framework"],
        ],
      },
      { type: "h2", id: "providers", text: "If you are an ICT provider to a financial entity" },
      {
        type: "list",
        items: [
          "Expect your customers to ask for recent penetration test evidence during due diligence.",
          "Expect contract clauses about participating in their testing.",
          "Keep a report and retest letter ready that you can share under NDA.",
        ],
      },
    ],
  },
  {
    slug: "mobile-banking-app-security-testing-checklist",
    title: "Mobile banking app security: a testing checklist",
    description:
      "What a mobile penetration test should cover for a banking or payments app, mapped to OWASP MASVS, from local storage to the APIs behind the app.",
    category: "Mobile",
    date: "2026-09-02",
    readingTime: "6 min read",
    tldr: [
      "Test the app, the device and the backend together, because attackers do.",
      "Most serious mobile findings sit in token storage and in the APIs the app calls.",
      "OWASP MASVS gives you a shared checklist with your testers and auditors.",
    ],
    relatedService: "mobile-application-penetration-testing",
    body: [
      { type: "h2", id: "scope", text: "Start with what the app protects" },
      {
        type: "p",
        text: "A banking app holds credentials, session tokens and personal data, and it can move money. Every test case should trace back to one of those assets.",
      },
      { type: "h2", id: "checklist", text: "The checklist" },
      {
        type: "table",
        head: ["Area", "What to check", "MASVS group"],
        rows: [
          ["Storage", "Tokens and personal data at rest, logs, backups", "MASVS-STORAGE"],
          ["Crypto", "Key handling, Keychain and Keystore use", "MASVS-CRYPTO"],
          ["Auth", "Biometrics, session expiry, device binding", "MASVS-AUTH"],
          ["Network", "TLS, certificate pinning, interception", "MASVS-NETWORK"],
          ["Platform", "Deep links, WebViews, clipboard", "MASVS-PLATFORM"],
          ["Resilience", "Tamper and root or jailbreak detection", "MASVS-RESILIENCE"],
        ],
      },
      { type: "h2", id: "backend", text: "Do not forget the backend" },
      {
        type: "p",
        text: "Once traffic is intercepted, the API can be called directly with any parameters. Authorisation flaws there are often more serious than anything inside the app itself.",
      },
      {
        type: "callout",
        title: "Before the test",
        text: "Provide release builds for both platforms, test accounts for each role and access to a backend environment that mirrors production.",
      },
    ],
  },
  {
    slug: "internal-network-pentest-what-to-expect",
    title: "Internal network penetration testing: what to expect",
    description:
      "How an assumed-breach internal network test works, what testers look for in Active Directory, and how to prepare your team.",
    category: "Network",
    date: "2026-08-14",
    readingTime: "5 min read",
    tldr: [
      "Internal tests start from an assumed breach, such as one employee laptop.",
      "Active Directory misconfiguration is the most common route to full compromise.",
      "Agree testing windows and an emergency contact before anything starts.",
    ],
    relatedService: "network-penetration-testing",
    body: [
      { type: "h2", id: "assumed-breach", text: "Why start from an assumed breach" },
      {
        type: "p",
        text: "Phishing and stolen credentials mean an attacker inside the network is a realistic starting point. An internal test measures how far one compromised device can reach.",
      },
      { type: "h2", id: "what", text: "What testers look for" },
      {
        type: "list",
        items: [
          "Weak or reused credentials and service accounts.",
          "Kerberos attacks and delegation misconfiguration.",
          "Legacy protocols that leak credentials on the network.",
          "Missing segmentation between user, server and sensitive zones.",
        ],
      },
      { type: "h2", id: "prepare", text: "How to prepare" },
      {
        type: "p",
        text: "Decide the starting position, agree exclusions such as production databases, name an emergency contact, and let your monitoring team know whether to treat the test as a live exercise.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
