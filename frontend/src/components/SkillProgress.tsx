import { motion, useReducedMotion } from "framer-motion";

export function SkillProgress({ name, score, tone = "blue" }: { name: string; score: number; tone?: "blue" | "red" }) {
  const reduce = useReducedMotion();
  const blocks = 10;
  const filled = Math.round(score / 10);
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="font-display text-base font-semibold uppercase tracking-wide">{name}</span>
        <span className={`font-mono text-sm ${tone === "red" ? "text-primary" : "text-secondary"}`}>{score}%</span>
      </div>
      <div className="flex gap-1" role="meter" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={name}>
        {Array.from({ length: blocks }).map((_, i) => (
          <motion.span
            key={i}
            className={`h-3 flex-1 ${i < filled ? (tone === "red" ? "bg-primary glow-red" : "bg-secondary glow-blue") : "bg-muted"}`}
            initial={reduce ? false : { opacity: 0, scaleY: 0.2 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.25 }}
          />
        ))}
      </div>
    </div>
  );
}

export function SkillRing({ name, score, size = 120 }: { name: string; score: number; size?: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={r} className="stroke-muted" strokeWidth="6" fill="none" />
          <motion.circle
            cx="50" cy="50" r={r} fill="none" strokeWidth="6" strokeLinecap="butt"
            className={score >= 80 ? "stroke-primary" : "stroke-secondary"}
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * (1 - score / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold">{score}</span>
      </div>
      <span className="terminal text-center text-[11px] text-muted-foreground">{name}</span>
    </div>
  );
}
