/**
 * flow-in, done in CSS with a view() scroll timeline: zero JS, content is visible by default,
 * and browsers without scroll-driven animations (or with reduced motion) simply show it.
 * `delay` (seconds) offsets the entry range slightly to stagger siblings.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  return (
    <Tag className={["reveal", className].filter(Boolean).join(" ")} style={{ "--rd": Math.round(delay * 100) } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
