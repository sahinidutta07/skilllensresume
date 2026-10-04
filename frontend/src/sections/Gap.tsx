import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillProgress } from "@/components/SkillProgress";
import { useAnalysis } from "@/lib/AnalysisContext";

export function Gap() {
  const { result } = useAnalysis();

  if (!result) {
    return null;
  }

  const detected = result.detected_skills || [];
  const missing = result.missing_skills || [];

  const scoreFor = (skill: string) => {
    const value = result.similarity_scores?.[skill];
    return value !== undefined ? Math.round(value) : 0;
  };

  const cols = [
    {
      title: "Current skills",
      tag: "STABLE",
      tone: "text-secondary",
      body:
        detected.length > 0 ? (
          detected.map((skill) => (
            <SkillProgress
              key={skill}
              name={skill}
              score={scoreFor(skill)}
              tone="blue"
            />
          ))
        ) : (
          <p className="terminal text-sm text-muted-foreground">
            No detected skills.
          </p>
        ),
    },
    {
      title: "Skill gaps",
      tag: "WARNING",
      tone: "text-primary",
      body:
        missing.length > 0 ? (
          missing.map((skill) => (
            <SkillProgress
              key={skill}
              name={skill}
              score={scoreFor(skill)}
              tone="red"
            />
          ))
        ) : (
          <p className="terminal text-sm text-muted-foreground">
            No major skill gaps detected.
          </p>
        ),
    },
    {
      title: "Recommended",
      tag: "NEXT",
      tone: "text-foreground",
      body: (
        <ul className="space-y-3">
          {missing.length > 0 ? (
            missing.slice(0, 4).map((skill) => (
              <li
                key={skill}
                className="flex items-center justify-between border border-border px-4 py-3 font-display font-semibold uppercase"
              >
                {skill}
                <span className="font-mono text-xs text-primary">
                  + ADD
                </span>
              </li>
            ))
          ) : (
            <li className="terminal text-sm text-muted-foreground">
              No recommendations available.
            </li>
          )}
        </ul>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden border-y border-border bg-ink py-28 sm:py-36">
      <div className="absolute inset-0 scanlines opacity-40" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          tag="Chapter 04 · Diagnostics"
          title="Every hero has a next level."
          text="SkillLens compares your current abilities with the skills required for your target career."
        />

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {cols.map((c, i) => (
            <div key={c.title} className="contents">
              <Reveal delay={i * 0.15} className="h-full">
                <div
                  className={`h-full border-2 bg-card p-6 ${
                    i === 1
                      ? "border-primary glow-red"
                      : "border-border"
                  }`}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold uppercase">
                      {c.title}
                    </h3>

                    <span
                      className={`terminal text-[10px] ${c.tone}`}
                    >
                      [{c.tag}]
                    </span>
                  </div>

                  <div className="space-y-6">{c.body}</div>
                </div>
              </Reveal>

              {i < 2 && (
                <div className="flex items-center justify-center text-muted-foreground">
                  <ArrowRight className="rotate-90 lg:rotate-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}