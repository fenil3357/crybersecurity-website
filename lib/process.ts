export const engagement = [
  {
    step: "Scope",
    coord: "N120 E080",
    title: "Agree targets and rules",
    body: "A scoping call to agree what is tested, which roles and environments, the testing window and how we reach you if something critical turns up.",
    youGet: "A fixed proposal and written rules of engagement, under NDA if you need one.",
  },
  {
    step: "Recon",
    coord: "N260 E250",
    title: "Map the attack surface",
    body: "We walk your systems as each user role and as an outsider, mapping routes, endpoints, identities and trust boundaries.",
    youGet: "A clear picture of what is exposed, including things you may not know are public.",
  },
  {
    step: "Exploit",
    coord: "N200 E430",
    title: "Attack it by hand",
    body: "Testers chain weaknesses together the way an attacker would, proving real impact on your data and money flows, within the agreed rules.",
    youGet: "Immediate notice of any critical issue, without waiting for the report.",
  },
  {
    step: "Report",
    coord: "N360 E560",
    title: "Explain every finding",
    body: "Each finding has severity, affected assets, proof of concept, business impact and a fix your developers can apply.",
    youGet: "An executive summary for leadership and auditors, and a technical report for engineering.",
  },
  {
    step: "Retest",
    coord: "N470 E700",
    title: "Prove it is fixed",
    body: "Once your team has remediated, we retest every finding and update the report to show what is closed.",
    youGet: "A retest report that shows auditors and customers the resolved state.",
  },
] as const;
