import { useEffect, useRef, useState, type DragEvent } from "react";
import { FileUp, FileText } from "lucide-react";
import { Button } from "./Button";
import { analyzeResume } from "@/lib/resumeApi";
import { useAnalysis } from "@/lib/AnalysisContext";

const STEPS = [
  "SYSTEM READY",
  "SCANNING DOCUMENT...",
  "ANALYZING SKILL SIGNATURE...",
  "POWER DETECTED — SEE PROFILE BELOW",
];

const ACCEPT = ".pdf,.docx";

export function UploadArea() {
  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [step, setStep] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const { setResult } = useAnalysis();

  const pick = (f?: File) => {
    if (!f) return;

    if (!/\.(pdf|docx)$/i.test(f.name)) {
      setError("ERROR: UNSUPPORTED FORMAT. USE PDF / DOCX");
      return;
    }

    setError(null);
    setFile(f);
    setStep(0);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    pick(e.dataTransfer.files?.[0]);
  };

  const analyze = async () => {
    if (!file) return;

    setScanning(true);
    setError(null);
    setStep(1);

    try {
      const result = await analyzeResume(file);
      setResult(result);
      setStep(STEPS.length - 1);

      document.getElementById("analysis")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? `ERROR: ${err.message}`
          : "ERROR: RESUME ANALYSIS FAILED",
      );
      setStep(0);
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    if (!scanning || step >= STEPS.length - 1) return;

    const t = setTimeout(() => {
      setStep((s) => s + 1);
    }, 900);

    return () => clearTimeout(t);
  }, [scanning, step]);

  const active = drag || scanning;

  return (
    <div className="relative">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        onClick={() => input.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            input.current?.click();
          }
        }}
        className={`relative cursor-pointer overflow-hidden border-2 border-dashed bg-card/70 px-6 py-14 text-center transition-all sm:py-20 ${
          active
            ? "border-secondary glow-blue"
            : "border-border hover:border-primary"
        }`}
      >
        <div className="absolute inset-0 scanlines opacity-60" />
        <div className="absolute inset-0 halftone opacity-30" />

        {active && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-scan h-1/3 w-full bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
          </div>
        )}

        <input
          ref={input}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />

        <div className="relative flex flex-col items-center gap-4">
          <div
            className={`flex h-16 w-16 items-center justify-center border-2 ${
              file
                ? "border-secondary text-secondary"
                : "border-primary text-primary"
            }`}
          >
            {file ? <FileText /> : <FileUp />}
          </div>

          <p className="font-display text-2xl font-bold uppercase tracking-wide sm:text-3xl">
            {file ? file.name : "Drop your resume here"}
          </p>

          <p className="terminal text-xs text-muted-foreground">
            Supported: PDF / DOCX · or click to browse
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="min-h-[3rem] border-l-2 border-secondary bg-ink/60 px-4 py-3 font-mono text-sm"
          aria-live="polite"
        >
          {error ? (
            <span className="text-primary">{error}</span>
          ) : (
            <span
              className={
                step === STEPS.length - 1
                  ? "text-primary"
                  : "text-secondary"
              }
            >
              &gt; {file || step ? STEPS[step] : STEPS[0]}
              <span className="animate-blink">_</span>
            </span>
          )}
        </div>

        <Button onClick={analyze} disabled={!file || scanning}>
          {scanning ? "Analyzing..." : "Analyze my skills"}
        </Button>
      </div>
    </div>
  );
}