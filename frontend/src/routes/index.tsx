import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Power } from "@/sections/Power";
import { Upload } from "@/sections/Upload";
import { Analysis } from "@/sections/Analysis";
import { Gap } from "@/sections/Gap";
import { Career } from "@/sections/Career";
import { Roadmap } from "@/sections/Roadmap";
import { FinalCta } from "@/sections/FinalCta";
import { AnalysisProvider } from "@/lib/AnalysisContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillLens — Discover Your Power" },
      {
        name: "description",
        content:
          "SkillLens turns your resume into a skill profile, reveals your gaps, and maps the career paths your abilities unlock.",
      },
      {
        property: "og:title",
        content: "SkillLens — Discover Your Power",
      },
      {
        property: "og:description",
        content:
          "Turn your experience into a skill profile and discover where your abilities can take you.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AnalysisProvider>
      <Navbar />
      <main>
        <Hero />
        <Power />
        <Upload />
        <Analysis />
        <Gap />
        <Career />
        <Roadmap />
        <FinalCta />
      </main>
      <Footer />
    </AnalysisProvider>
  );
}