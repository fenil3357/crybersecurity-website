/** reveal: a wipe as a change of state, driven by a CSS view() timeline. Visible by default. */
export function ClipReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={["clip-reveal", className].filter(Boolean).join(" ")}>{children}</div>;
}
