import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CareerNode } from "@/components/CareerNode";
import { SectionHeading } from "@/components/SectionHeading";
import { WebBackground } from "@/components/WebMark";
import { useAnalysis } from "@/lib/AnalysisContext";

type CareerStage = {
  title: string;
  level: string;
  difficulty: number;
  required: string[];
  tech: string[];
  missing: string[];
};

function Tags({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: string;
}) {
  return (
    <div>
      <p className="terminal mb-3 text-[10px] text-muted-foreground">
        {label}
      </p>

      <div className="flex flex-wrap gap-2">
        {items.length ? (
          items.map((item) => (
            <span
              key={item}
              className={`border px-3 py-1 text-sm ${tone}`}
            >
              {item}
            </span>
          ))
        ) : (
          <span className="font-mono text-sm text-secondary">
            NONE — CLEARED
          </span>
        )}
      </div>
    </div>
  );
}

export function Career() {
  const { result } = useAnalysis();
  const [active, setActive] = useState(0);

  if (!result) {
    return null;
  }

  const detected = result.detected_skills || [];
  const missing = result.missing_skills || [];

  const careerPath: CareerStage[] = [
    {
      title: result.predicted_role || "Career Match",
      level: "LVL 01",
      difficulty: 3,
      required: detected,
      tech: detected.slice(0, 6),
      missing,
    },
  ];

  const stage = careerPath[active] ?? careerPath[0];

  return (
    <section
      id="career"
      className="relative overflow-hidden py-28 sm:py-36"
    >
      <WebBackground className="absolute -left-60 top-10 h-[700px] w-[700px] text-primary/10" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          tag="Chapter 05 · Mission log"
          title="Your next mission."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div className="relative space-y-6">
            <div className="absolute bottom-6 left-[2.6rem] top-6 w-px bg-gradient-to-b from-secondary via-primary to-primary/20 sm:left-[2.85rem]" />

            {careerPath.map((s, i) => (
              <CareerNode
                key={s.title}
                stage={s}
                index={i}
                active={i === active}
                onSelect={() => setActive(i)}
              />
            ))}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="comic-frame relative overflow-hidden bg-card p-7 sm:p-9"
              >
                <div className="absolute inset-0 halftone-red opacity-20" />

                <div className="relative space-y-7">
                  <div>
                    <p className="terminal text-xs text-primary">
                      Mission briefing · {stage.level}
                    </p>

                    <h3 className="mt-2 font-display text-3xl font-bold uppercase sm:text-4xl">
                      {stage.title}
                    </h3>
                  </div>

                  <div>
                    <p className="terminal mb-2 text-[10px] text-muted-foreground">
                      Match score
                    </p>

                    <p className="font-display text-3xl font-bold text-primary">
                      {Math.round(result.match_score)}%
                    </p>
                  </div>

                  <div>
                    <p className="terminal mb-2 text-[10px] text-muted-foreground">
                      Estimated difficulty
                    </p>

                    <div className="flex gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`h-2.5 w-10 ${
                            i < stage.difficulty
                              ? "bg-primary"
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <Tags
                    label="Detected skills"
                    items={stage.required}
                    tone="border-border"
                  />

                  <Tags
                    label="Current skill signals"
                    items={stage.tech}
                    tone="border-secondary text-secondary"
                  />

                  <Tags
                    label="Missing skills"
                    items={stage.missing}
                    tone="border-primary text-primary"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}