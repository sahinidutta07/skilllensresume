import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { UploadArea } from "@/components/UploadArea";

export function Upload() {
  return (
    <section id="upload" className="relative border-y border-border bg-navy/40 py-28 sm:py-36">
      <div className="absolute inset-0 halftone-blue opacity-10" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:px-8">
        <SectionHeading tag="Chapter 02 · Origin" title="Upload your story." text="Let SkillLens turn your experience into a map of your abilities." />
        <Reveal delay={0.15}>
          <UploadArea />
        </Reveal>
      </div>
    </section>
  );
}
