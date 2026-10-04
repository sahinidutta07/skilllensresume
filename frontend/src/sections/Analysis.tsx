import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillProgress, SkillRing } from "@/components/SkillProgress";
import { useAnalysis } from "@/lib/AnalysisContext";

export function Analysis() {
  const { result } = useAnalysis();

  if (!result) {
    return (
      <section id="analysis" className="relative py-28 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            tag="Chapter 03 · Profile"
            title="Upload your resume."
          />

          <p className="terminal mt-6 text-sm text-muted-foreground">
            Waiting for resume analysis...
          </p>
        </div>
      </section>
    );
  }

  const skillScores = Object.entries(result.similarity_scores)
    .map(([name, score]) => ({
      name,
      score: Math.round(score),
    }))
    .sort((a, b) => b.score - a.score);

  const powers = [
    {
      label: "Primary Power",
      skill: result.detected_skills[0] || "—",
      tone: "red" as const,
    },
    {
      label: "Secondary Power",
      skill: result.detected_skills[1] || "—",
      tone: "blue" as const,
    },
    {
      label: "Developing Power",
      skill: result.detected_skills[2] || "—",
      tone: "muted" as const,
    },
  ];

  return (
    <section id="analysis" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tag="Chapter 03 · Profile"
            title="Power detected."
          />

          <p className="terminal text-xs text-secondary">
            Subject: resume_scan · scan 100% · live analysis
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {powers.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.1}>
              <div
                className={`relative overflow-hidden border-2 bg-card p-6 ${
                  p.tone === "red"
                    ? "border-primary glow-red"
                    : p.tone === "blue"
                      ? "border-secondary glow-blue"
                      : "border-border"
                }`}
              >
                <p className="terminal text-[10px] text-muted-foreground">
                  {p.label}
                </p>

                <p className="mt-3 font-display text-3xl font-bold uppercase sm:text-4xl">
                  {p.skill}
                </p>

                <span
                  className={`absolute right-4 top-4 font-mono text-xs ${
                    p.tone === "red"
                      ? "text-primary"
                      : p.tone === "blue"
                        ? "text-secondary"
                        : "text-muted-foreground"
                  }`}
                >
                  [{String(i + 1).padStart(2, "0")}]
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="h-full comic-frame bg-card p-6 sm:p-8">
              <p className="terminal mb-8 text-xs text-muted-foreground">
                Power levels
              </p>

              <div className="mb-8 flex items-center gap-6 border-b border-border pb-6">
                <div>
                  <p className="terminal text-[10px] text-muted-foreground">
                    Predicted role
                  </p>

                  <p className="mt-2 font-display text-2xl font-bold uppercase">
                    {result.predicted_role}
                  </p>
                </div>

                <div className="ml-auto text-right">
                  <p className="terminal text-[10px] text-muted-foreground">
                    Match score
                  </p>

                  <p className="mt-2 font-display text-3xl font-bold text-primary">
                    {Math.round(result.match_score)}%
                  </p>
                </div>
              </div>

              {skillScores.length > 0 ? (
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                  {skillScores.map((skill) => (
                    <SkillRing
                      key={skill.name}
                      name={skill.name}
                      score={skill.score}
                      size={110}
                    />
                  ))}
                </div>
              ) : (
                <p className="terminal text-sm text-muted-foreground">
                  No similarity scores detected.
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full border-2 border-border bg-card p-6 sm:p-8">
              <p className="terminal mb-8 text-xs text-muted-foreground">
                Signal strength
              </p>

              <div className="space-y-6">
                {skillScores.length > 0 ? (
                  skillScores.map((skill) => (
                    <SkillProgress
                      key={skill.name}
                      name={skill.name}
                      score={skill.score}
                      tone={skill.score >= 85 ? "red" : "blue"}
                    />
                  ))
                ) : (
                  <p className="terminal text-sm text-muted-foreground">
                    No skill signals available.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}