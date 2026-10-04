import { Eye, ScanLine, TrendingUp } from "lucide-react";
import { ComicPanel } from "@/components/ComicPanel";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const panels = [
  { n: "01", title: "Identify", text: "Discover the skills you already possess.", Icon: Eye, tone: "red" as const, span: "lg:col-span-7 lg:row-span-2", tilt: "lg:-rotate-1" },
  { n: "02", title: "Analyze", text: "Understand your strengths and skill gaps.", Icon: ScanLine, tone: "blue" as const, span: "lg:col-span-5", tilt: "lg:rotate-1" },
  { n: "03", title: "Evolve", text: "Build the skills that move your career forward.", Icon: TrendingUp, tone: "red" as const, span: "lg:col-span-5", tilt: "lg:-rotate-[0.5deg]" },
];

export function Power() {
  return (
    <section id="discover" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading tag="Chapter 01" title="What's your power?" text="Your resume tells your story. SkillLens reveals the abilities hiding inside it." />
        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:grid-rows-2">
          {panels.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.12} className={`${p.span} ${p.tilt}`}>
              <ComicPanel tone={p.tone} className="h-full">
                <div className={`flex h-full flex-col justify-between gap-10 p-7 sm:p-9 ${i === 0 ? "lg:min-h-[420px]" : ""}`}>
                  <div className="flex items-start justify-between">
                    <span className={`terminal border px-2 py-1 text-[10px] ${p.tone === "red" ? "border-primary text-primary" : "border-secondary text-secondary"}`}>
                      Panel {p.n}
                    </span>
                    <p.Icon className={p.tone === "red" ? "text-primary" : "text-secondary"} />
                  </div>
                  <div>
                    <h3 className={`font-display font-bold uppercase leading-none ${i === 0 ? "text-6xl sm:text-8xl" : "text-5xl"}`}>{p.title}</h3>
                    <p className="mt-4 text-muted-foreground">{p.text}</p>
                  </div>
                </div>
              </ComicPanel>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
