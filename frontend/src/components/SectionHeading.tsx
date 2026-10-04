import { Reveal } from "./Reveal";

export function SectionHeading({ tag, title, text, align = "left" }: { tag: string; title: string; text?: string; align?: "left" | "center" }) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="terminal mb-4 text-xs text-secondary">
        <span className="text-primary">//</span> {tag}
      </p>
      <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">{title}</h2>
      {text && <p className={`mt-6 max-w-xl text-lg text-muted-foreground ${center ? "mx-auto" : ""}`}>{text}</p>}
    </Reveal>
  );
}
