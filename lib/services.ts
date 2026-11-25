export type Severity = "Critical" | "High" | "Medium" | "Low";

export type Service = {
  slug: string;
  code: string; // short survey code used on the map, e.g. "WEB"
  title: string;
  shortTitle: string;
  noun: string; // singular, for phrases like "Scope your API test"
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string; // one line for cards
  outcome: string; // business outcome for cards
  forWho: string;
  risk: { heading: string; body: string };
  targets: string[]; // asset types
  testAreas: { title: string; body: string }[];
  methodology: { phase: string; body: string }[];
  standards: string[];
  sampleFinding: {
    id: string;
    title: string;
    severity: Severity;
    asset: string;
    impact: string;
    fix: string;
  };
  frameworks: string[]; // framework ids from site.frameworks
  faqs: { q: string; a: string }[];
  related: string[]; // slugs
};

const sharedFaqs = {
  production: {
    q: "Will testing disrupt our production systems?",
    a: "Testing windows, rate limits and any out-of-bounds systems are agreed in the rules of engagement before we start. Destructive techniques are only used with your written approval, and a named contact can pause testing at any time.",
  },
  retest: {
    q: "Is retesting included?",
    a: "Yes. Once your team has fixed the findings, we retest them and issue an updated report showing what is resolved, so your auditor and customers see the closed state.",
  },
  nda: {
    q: "Can we sign an NDA before sharing scope details?",
    a: "Yes. We sign a mutual NDA before the scoping call whenever you need one, so architecture details can be discussed freely.",
  },
};

export const services: Service[] = [
  {
    slug: "vulnerability-assessment-penetration-testing",
    code: "VAPT",
    noun: "VAPT",
    title: "Vulnerability Assessment & Penetration Testing",
    shortTitle: "VAPT",
    h1: "Vulnerability assessment and penetration testing across your whole environment",
    metaTitle: "VAPT Services for Fintech and SaaS",
    metaDescription:
      "Vulnerability assessment and penetration testing that combines broad coverage with manual exploitation. Prioritised findings, fixes and free retesting.",
    summary: "Broad vulnerability coverage across your estate, then manual exploitation of what matters.",
    outcome: "One prioritised view of real risk across applications, cloud and infrastructure.",
    forWho: "For teams that need a full picture before an audit, a funding round or a large customer review.",
    risk: {
      heading: "Scanner output is not a risk picture",
      body: "Automated scans list thousands of issues and miss how they chain together. A vulnerability assessment shows what is exposed; penetration testing proves which issues an attacker can actually use, and how far they get.",
    },
    targets: ["Web applications", "APIs", "Cloud accounts", "External perimeter", "Internal networks", "Endpoints"],
    testAreas: [
      { title: "Asset discovery", body: "Mapping exposed hosts, services, domains and forgotten environments before testing starts." },
      { title: "Vulnerability assessment", body: "Authenticated and unauthenticated scanning, with every result triaged by a tester to remove false positives." },
      { title: "Manual exploitation", body: "Exploiting the highest-impact issues by hand to show real business impact, not theoretical severity." },
      { title: "Attack path analysis", body: "Chaining low and medium issues into the routes an attacker would take toward your critical data." },
      { title: "Cloud configuration", body: "Reviewing identity, storage and network configuration in AWS, Azure or Google Cloud." },
      { title: "Risk prioritisation", body: "Ranking findings by exploitability and business impact so engineering fixes the right things first." },
    ],
    methodology: [
      { phase: "Scope", body: "Agree targets, credentials, testing windows and rules of engagement." },
      { phase: "Discover", body: "Map the attack surface and run triaged vulnerability assessment." },
      { phase: "Exploit", body: "Manually validate and chain issues to prove impact." },
      { phase: "Report", body: "Deliver prioritised findings with reproduction steps and fixes." },
      { phase: "Retest", body: "Verify fixes and issue an updated report." },
    ],
    standards: ["NIST SP 800-115", "PTES", "OWASP WSTG", "CVSS v4"],
    sampleFinding: {
      id: "VA-07",
      title: "Exposed staging admin panel with default credentials",
      severity: "Critical",
      asset: "staging-admin.example.com",
      impact: "Full administrative access to a staging environment holding a copy of production customer data.",
      fix: "Remove public exposure, rotate credentials and restrict access to the corporate VPN.",
    },
    frameworks: ["soc2", "iso27001", "pci", "nis2"],
    faqs: [
      {
        q: "What is the difference between a vulnerability assessment and a penetration test?",
        a: "A vulnerability assessment identifies and ranks known weaknesses across many systems. A penetration test goes further and manually exploits them to prove what an attacker could reach. VAPT combines both.",
      },
      {
        q: "How do you decide what to exploit manually?",
        a: "We prioritise issues by exposure and the value of what sits behind them, then agree any sensitive targets with you before exploitation.",
      },
      sharedFaqs.production,
      sharedFaqs.retest,
      sharedFaqs.nda,
    ],
    related: ["network-penetration-testing", "web-application-penetration-testing"],
  },
  {
    slug: "web-application-penetration-testing",
    code: "WEB",
    noun: "web application",
    title: "Web Application Penetration Testing",
    shortTitle: "Web applications",
    h1: "Web application penetration testing for SaaS and fintech products",
    metaTitle: "Web Application Penetration Testing",
    metaDescription:
      "Manual web application penetration testing covering authentication, authorisation, business logic and OWASP risks. Clear fixes and free retesting.",
    summary: "Manual testing of authentication, sessions, authorisation and business logic.",
    outcome: "Find the flaws scanners miss before a customer, auditor or attacker does.",
    forWho: "For SaaS and fintech teams shipping customer-facing web applications and portals.",
    risk: {
      heading: "The serious flaws live in your logic",
      body: "Scanners catch missing headers and known CVEs. They do not notice that one tenant can read another tenant's invoices, or that a refund can be issued twice. Those are the findings that end up in breach reports.",
    },
    targets: ["Customer portals", "Admin consoles", "Multi-tenant SaaS", "Payment flows", "Single-page apps", "SSO and OAuth"],
    testAreas: [
      { title: "Authentication", body: "Login, MFA, password reset, SSO and OAuth flows tested for bypass and takeover." },
      { title: "Session management", body: "Token handling, expiry, fixation and logout behaviour across devices." },
      { title: "Authorisation", body: "Horizontal and vertical access control, including tenant isolation in multi-tenant SaaS." },
      { title: "Business logic", body: "Abuse of workflows such as payments, refunds, approvals, limits and pricing." },
      { title: "Injection and input handling", body: "SQL, command, template and XSS injection, file upload and deserialisation." },
      { title: "Client-side security", body: "Content security policy, sensitive data in the browser and third-party script exposure." },
    ],
    methodology: [
      { phase: "Scope", body: "Agree roles, test accounts, environments and critical workflows." },
      { phase: "Map", body: "Walk the application as each role and map every route and permission." },
      { phase: "Test", body: "Manual testing against OWASP WSTG and ASVS, led by business logic." },
      { phase: "Report", body: "Findings with proof of concept, impact and developer-ready fixes." },
      { phase: "Retest", body: "Verify fixes and issue an updated report." },
    ],
    standards: ["OWASP WSTG", "OWASP ASVS", "OWASP Top 10", "CVSS v4"],
    sampleFinding: {
      id: "WEB-12",
      title: "Cross-tenant invoice access through predictable IDs",
      severity: "High",
      asset: "GET /api/v2/invoices/{id}",
      impact: "Any authenticated user could download invoices belonging to other customer organisations.",
      fix: "Enforce tenant ownership checks on every object lookup and switch to non-sequential identifiers.",
    },
    frameworks: ["soc2", "iso27001", "pci", "hipaa"],
    faqs: [
      {
        q: "Do you test as an anonymous user or with accounts?",
        a: "Both. We test unauthenticated exposure and then use accounts for each role you provide, because most serious findings sit behind the login.",
      },
      {
        q: "Should we test in production or staging?",
        a: "A staging environment that mirrors production is usually best. If staging differs materially, we can test production within agreed safeguards.",
      },
      sharedFaqs.production,
      sharedFaqs.retest,
      sharedFaqs.nda,
    ],
    related: ["api-security-review", "mobile-application-penetration-testing"],
  },
  {
    slug: "mobile-application-penetration-testing",
    code: "MOB",
    noun: "mobile app",
    title: "Mobile Application Penetration Testing",
    shortTitle: "Mobile applications",
    h1: "Mobile application penetration testing for iOS and Android",
    metaTitle: "iOS and Android App Penetration Testing",
    metaDescription:
      "Mobile app penetration testing for iOS and Android, covering local storage, communication, authentication and the backend APIs your app relies on.",
    summary: "iOS and Android apps, their communication channels and the backends behind them.",
    outcome: "Ship banking-grade mobile apps with evidence that they hold up under attack.",
    forWho: "For fintech, banking and health apps that handle credentials, payments or personal data.",
    risk: {
      heading: "Your app runs on devices you do not control",
      body: "Attackers can decompile your app, read what it stores, intercept its traffic and replay its API calls. Mobile testing looks at the app, the device and the backend together, because that is how they are attacked.",
    },
    targets: ["iOS apps", "Android apps", "Mobile backends", "Deep links", "Push and SDKs", "Biometric flows"],
    testAreas: [
      { title: "Local data storage", body: "Keychain, Keystore, databases, logs and caches checked for sensitive data at rest." },
      { title: "Network communication", body: "TLS configuration, certificate pinning and traffic interception resistance." },
      { title: "Authentication", body: "Biometrics, session tokens, device binding and account recovery on mobile." },
      { title: "Reverse engineering", body: "Decompilation, hardcoded secrets, tamper detection and jailbreak or root checks." },
      { title: "Platform interaction", body: "Deep links, intents, WebViews, clipboard and inter-app communication." },
      { title: "Backend APIs", body: "The APIs your app calls, tested for authorisation and abuse beyond what the app allows." },
    ],
    methodology: [
      { phase: "Scope", body: "Agree builds, platforms, accounts and backend environments." },
      { phase: "Analyse", body: "Static analysis of the binaries and dynamic analysis on test devices." },
      { phase: "Test", body: "Manual testing against OWASP MASVS and MASTG, app and API together." },
      { phase: "Report", body: "Findings per platform with reproduction steps and fixes." },
      { phase: "Retest", body: "Verify fixes in new builds and issue an updated report." },
    ],
    standards: ["OWASP MASVS", "OWASP MASTG", "OWASP API Top 10", "CVSS v4"],
    sampleFinding: {
      id: "MOB-04",
      title: "Session token stored in plaintext app preferences",
      severity: "High",
      asset: "Android app, SharedPreferences",
      impact: "A malicious app or device backup could extract a valid session token and take over the account.",
      fix: "Store tokens in the Android Keystore with encryption and shorten token lifetime.",
    },
    frameworks: ["soc2", "pci", "dora", "hipaa"],
    faqs: [
      {
        q: "Do you need our source code?",
        a: "No. We test the compiled builds as an attacker would. Source access speeds up some checks and is welcome but optional.",
      },
      {
        q: "Do you test both iOS and Android?",
        a: "Yes, either platform or both. Shared backends are tested once, and platform-specific findings are reported separately.",
      },
      sharedFaqs.retest,
      sharedFaqs.nda,
    ],
    related: ["api-security-review", "web-application-penetration-testing"],
  },
  {
    slug: "api-security-review",
    code: "API",
    noun: "API",
    title: "API Security Review",
    shortTitle: "APIs",
    h1: "API security review for REST, GraphQL and SOAP",
    metaTitle: "API Penetration Testing: REST and GraphQL",
    metaDescription:
      "API penetration testing for REST, GraphQL and SOAP. We test authorisation, data exposure and abuse against the OWASP API Security Top 10.",
    summary: "REST, GraphQL and SOAP APIs tested for authorisation flaws, data exposure and abuse.",
    outcome: "Close the gaps that let one customer reach another customer's data.",
    forWho: "For platforms with public, partner or mobile APIs, and for teams preparing an API launch.",
    risk: {
      heading: "APIs expose your data model directly",
      body: "Every endpoint is a direct question to your backend. If any object lookup trusts the caller's ID, or any field is returned that should not be, the API will hand data to whoever asks.",
    },
    targets: ["REST APIs", "GraphQL", "SOAP services", "Partner APIs", "Webhooks", "API gateways"],
    testAreas: [
      { title: "Object-level authorisation", body: "BOLA and IDOR testing across every object your API returns or changes." },
      { title: "Function-level authorisation", body: "Admin and internal functions reachable by ordinary users or partners." },
      { title: "Data exposure", body: "Excessive fields, mass assignment and sensitive data in responses and errors." },
      { title: "Authentication and tokens", body: "JWT handling, API keys, OAuth scopes and token lifetime." },
      { title: "Abuse and rate limiting", body: "Enumeration, brute force, resource exhaustion and business flow abuse." },
      { title: "GraphQL specifics", body: "Introspection, query depth and batching, and resolver-level authorisation." },
    ],
    methodology: [
      { phase: "Scope", body: "Agree specs, environments, roles and rate limits." },
      { phase: "Model", body: "Build the access model from OpenAPI, GraphQL schema or traffic." },
      { phase: "Test", body: "Manual testing against the OWASP API Security Top 10." },
      { phase: "Report", body: "Endpoint-level findings with requests, responses and fixes." },
      { phase: "Retest", body: "Verify fixes and issue an updated report." },
    ],
    standards: ["OWASP API Top 10", "OWASP ASVS", "CVSS v4"],
    sampleFinding: {
      id: "API-03",
      title: "Mass assignment allows role escalation",
      severity: "Critical",
      asset: "PATCH /v1/users/me",
      impact: "A standard user could set their own role field to admin and gain full platform access.",
      fix: "Allow-list writable fields server-side and reject unknown properties.",
    },
    frameworks: ["soc2", "pci", "dora", "iso27001"],
    faqs: [
      {
        q: "What do you need to start an API test?",
        a: "An OpenAPI or GraphQL schema if you have one, test accounts for each role, and a non-production environment. We can work from captured traffic if documentation is incomplete.",
      },
      {
        q: "Do you test GraphQL differently?",
        a: "Yes. GraphQL needs resolver-level authorisation testing, query complexity checks and batching abuse tests on top of standard API testing.",
      },
      sharedFaqs.production,
      sharedFaqs.retest,
    ],
    related: ["web-application-penetration-testing", "mobile-application-penetration-testing"],
  },
  {
    slug: "network-penetration-testing",
    code: "NET",
    noun: "network",
    title: "Network Penetration Testing",
    shortTitle: "Networks",
    h1: "External and internal network penetration testing",
    metaTitle: "External and Internal Network Pentesting",
    metaDescription:
      "Network penetration testing of your external perimeter and internal environment. Find the attack paths from the internet or a compromised laptop to your critical systems.",
    summary: "External and internal networks assessed for vulnerabilities and attack paths.",
    outcome: "Know how far an attacker gets from the internet, or from one compromised laptop.",
    forWho: "For organisations with on-premise, hybrid or cloud networks, and for PCI DSS 11.4 testing.",
    risk: {
      heading: "One foothold is often enough",
      body: "A single exposed service or phished laptop can lead to domain admin within hours when internal networks are flat. Network testing shows that path before someone else walks it.",
    },
    targets: ["External perimeter", "Internal networks", "Active Directory", "VPN and remote access", "Cloud networking", "Segmentation"],
    testAreas: [
      { title: "External perimeter", body: "Internet-facing hosts, services, VPNs and mail infrastructure." },
      { title: "Internal network", body: "Testing from an assumed-breach position, such as a standard employee laptop." },
      { title: "Active Directory", body: "Privilege escalation paths, Kerberos attacks and misconfigured permissions." },
      { title: "Segmentation", body: "Validation that cardholder or sensitive zones are actually isolated." },
      { title: "Lateral movement", body: "Credential reuse, weak protocols and paths between network zones." },
      { title: "Hardening", body: "Patch levels, legacy protocols and default configurations." },
    ],
    methodology: [
      { phase: "Scope", body: "Agree ranges, starting positions and exclusions." },
      { phase: "Recon", body: "Enumerate hosts, services and identity infrastructure." },
      { phase: "Exploit", body: "Gain access and move toward agreed objectives." },
      { phase: "Report", body: "Attack paths, findings and fixes ranked by impact." },
      { phase: "Retest", body: "Verify fixes and issue an updated report." },
    ],
    standards: ["PTES", "NIST SP 800-115", "OSSTMM", "CVSS v4"],
    sampleFinding: {
      id: "NET-09",
      title: "Kerberoastable service account with weak password",
      severity: "High",
      asset: "Internal AD, svc-backup",
      impact: "The cracked service account had local admin rights on file servers holding finance data.",
      fix: "Use a long random password or a managed service account and remove unneeded privileges.",
    },
    frameworks: ["pci", "iso27001", "nis2", "dora"],
    faqs: [
      {
        q: "Do you need to be on site for internal testing?",
        a: "Rarely. We usually test through a small virtual appliance or a VPN connection you provide, which avoids travel and scheduling delays.",
      },
      {
        q: "Does this cover PCI DSS requirement 11.4?",
        a: "Yes. We test external and internal networks and segmentation controls and document the results in a form your QSA can review.",
      },
      sharedFaqs.production,
      sharedFaqs.retest,
    ],
    related: ["vulnerability-assessment-penetration-testing", "thick-client-penetration-testing"],
  },
  {
    slug: "thick-client-penetration-testing",
    code: "TCX",
    noun: "thick-client",
    title: "Thick-Client Penetration Testing",
    shortTitle: "Thick clients",
    h1: "Thick-client penetration testing for desktop applications",
    metaTitle: "Thick Client Penetration Testing",
    metaDescription:
      "Thick-client penetration testing for Windows, macOS, Java and .NET desktop applications, including local storage, binaries and server communication.",
    summary: "Desktop applications on Windows, macOS, Java and .NET tested end to end.",
    outcome: "Secure the trading, banking and back-office tools your staff rely on.",
    forWho: "For trading terminals, back-office tools and desktop agents used in regulated environments.",
    risk: {
      heading: "Desktop apps often trust the user's machine",
      body: "Thick clients frequently store secrets locally, talk to databases directly or enforce rules only in the client. Anyone with the installer can inspect and modify them.",
    },
    targets: ["Windows apps", "macOS apps", "Java clients", ".NET clients", "Electron apps", "Client-server protocols"],
    testAreas: [
      { title: "Binary analysis", body: "Decompilation, hardcoded credentials and insecure update mechanisms." },
      { title: "Local storage", body: "Configuration files, registry, caches and logs checked for secrets." },
      { title: "Client-side controls", body: "Business rules enforced only in the client and how they can be bypassed." },
      { title: "Communication", body: "Traffic to servers and databases, including proprietary protocols." },
      { title: "Privilege and DLLs", body: "DLL hijacking, privilege escalation and insecure file permissions." },
      { title: "Server-side APIs", body: "The services the client talks to, tested beyond what the client allows." },
    ],
    methodology: [
      { phase: "Scope", body: "Agree builds, platforms, accounts and server environments." },
      { phase: "Analyse", body: "Static analysis of binaries and dynamic analysis at runtime." },
      { phase: "Test", body: "Manual testing of client, communication and server components." },
      { phase: "Report", body: "Findings with reproduction steps and fixes per component." },
      { phase: "Retest", body: "Verify fixes in new builds and issue an updated report." },
    ],
    standards: ["OWASP WSTG", "NIST SP 800-115", "CVSS v4"],
    sampleFinding: {
      id: "TCX-02",
      title: "Database credentials embedded in .NET assembly",
      severity: "Critical",
      asset: "TradeDesk.exe, Config.dll",
      impact: "Any user with the installer could connect directly to the production database with write access.",
      fix: "Move database access behind an authenticated service and rotate the exposed credentials.",
    },
    frameworks: ["soc2", "iso27001", "pci", "dora"],
    faqs: [
      {
        q: "Which platforms do you cover?",
        a: "Windows and macOS desktop applications built with .NET, Java, C and C++, and Electron, along with the servers they connect to.",
      },
      {
        q: "Can you test applications that use proprietary protocols?",
        a: "Yes. We intercept and analyse custom protocols, which is often where the most serious thick-client findings are.",
      },
      sharedFaqs.retest,
      sharedFaqs.nda,
    ],
    related: ["network-penetration-testing", "vulnerability-assessment-penetration-testing"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
