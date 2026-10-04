import { useRef, type ReactNode, type MouseEvent } from "react";

export function ComicPanel({ children, tone = "red", className = "" }: { children: ReactNode; tone?: "red" | "blue"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };
  const reset = () => ref.current && (ref.current.style.transform = "");
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`group relative overflow-hidden bg-card comic-frame transition-transform duration-200 ease-out ${className}`}
    >
      <div className={`absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-80 ${tone === "red" ? "halftone-red" : "halftone-blue"}`} />
      <div className={`absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity ${tone === "red" ? "bg-primary" : "bg-secondary"}`} />
      <div className="relative">{children}</div>
    </div>
  );
}
