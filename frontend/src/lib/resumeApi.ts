import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";
import mammoth from "mammoth";

export type AnalysisResult = {
  predicted_role: string;
  match_score: number;
  detected_skills: string[];
  missing_skills: string[];
  similarity_scores: Record<string, number>;
};

const API_URL = "https://skilllensresume.onrender.com";

async function extractPdfText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
  }).promise;

  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();

    const text = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");

    pages.push(text);
  }

  return pages.join("\n");
}

async function extractDocxText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();

  const result = await mammoth.extractRawText({
    arrayBuffer: buffer,
  });

  return result.value;
}

async function extractResumeText(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "pdf") {
    return extractPdfText(file);
  }

  if (extension === "docx") {
    return extractDocxText(file);
  }

  throw new Error("Unsupported file format. Please upload a PDF or DOCX.");
}

export async function analyzeResume(file: File): Promise<AnalysisResult> {
  const resumeText = await extractResumeText(file);

  if (!resumeText.trim()) {
    throw new Error("Could not extract any text from the resume.");
  }

  const response = await fetch(API_URL + "/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resume_text: resumeText,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Resume analysis failed.");
  }

  return data as AnalysisResult;
}
