import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { useAnalysis } from "@/lib/AnalysisContext";

export function Roadmap() {
  const { result } = useAnalysis();

  if (!result) {
    return null;
  }

  const missing = result.missing_skills || [];

  const roadmap = [
    {
      week: "01",
      title: "Strengthen Core",
      note:
        result.detected_skills.length > 0
          ? `Build deeper proficiency in ${result.detected_skills
              .slice(0, 2)
              .join(" and ")}.`
          : "Build your strongest foundational skills.",
    },
    {
      week: "02",
      title: "Close Skill Gaps",
      note:
        missing.length > 0
          ? `Focus on ${missing.slice(0, 2).join(" and ")}.`
          : "No major skill gaps detected.",
    },
    {
      week: "03",
      title: "Build a Project",
      note: `Create a practical project aligned with ${result.predicted_role}.`,
    },
    {
      week: "04",
      title: "Validate Skills",
      note:
        "Practice problems, document your work, and strengthen your portfolio.",
    },
    {
      week: "05",
      title: "Level Up",
      note:
        `Prepare for ${result.predicted_role} opportunities and keep improving your ${Math.round(
          result.match_score,
        )}% match.`,
    },
  ];

  return (
    <section className="relative border-t border-border bg-navy/30 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          tag="Chapter 06 · Training arc"
          title="Build your power."
        />

        <ol className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {roadmap.map((r, i) => {
            const last = i === roadmap.length - 1;

            return (
              <Reveal
                key={r.week}
                delay={i * 0.1}
                className={i % 2 ? "lg:mt-12" : ""}
              >
                <li
                  className={`relative h-full overflow-hidden comic-frame p-6 ${
                    last
                      ? "bg-primary text-primary-foreground"
                      : "bg-card"
                  }`}
                >
                  {!last && (
                    <div
                      className={`absolute inset-0 opacity-25 ${
                        i % 2
                          ? "halftone-blue"
                          : "halftone-red"
                      }`}
                    />
                  )}

                  <div className="relative">
                    <p
                      className={`terminal text-[10px] ${
                        last
                          ? ""
                          : i % 2
                            ? "text-secondary"
                            : "text-primary"
                      }`}
                    >
                      Week
                    </p>

                    <p className="font-display text-6xl font-bold leading-none">
                      {r.week}
                    </p>

                    <h3 className="mt-6 font-display text-xl font-bold uppercase leading-tight">
                      {r.title}
                    </h3>

                    <p
                      className={`mt-2 text-sm ${
                        last
                          ? "opacity-90"
                          : "text-muted-foreground"
                      }`}
                    >
                      {r.note}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}