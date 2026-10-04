import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
};

export function Button({ children, href, variant = "primary", onClick, disabled, className, type = "button" }: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-visible px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground glow-red hover:scale-[1.04] hover:shadow-[var(--glow-red-strong)] [clip-path:polygon(0_0,100%_0,100%_70%,92%_100%,0_100%)]"
      : "border border-foreground/40 text-foreground hover:border-secondary hover:text-secondary hover:glow-blue";
  const web = variant === "primary" && (
    <span aria-hidden className="pointer-events-none absolute left-full top-1/2 h-px w-0 bg-primary transition-all duration-500 group-hover:w-24 max-sm:hidden" />
  );
  const content = (
    <>
      {children}
      {web}
    </>
  );
  if (href)
    return (
      <a href={href} className={cn(base, styles, className)}>
        {content}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cn(base, styles, className)}>
      {content}
    </button>
  );
}
