// Mock data used only to demonstrate the UI.
// This will be replaced by real analysis results later.

export type Skill = {
  name: string;
  score: number;
};

export const skills: Skill[] = [
  { name: "React", score: 91 },
  { name: "JavaScript", score: 87 },
  { name: "Problem Solving", score: 84 },
  { name: "Python", score: 76 },
  { name: "Data Structures", score: 72 },
  { name: "Communication", score: 68 },
];

export const powers = [
  {
    label: "Primary Power",
    skill: "React",
    tone: "red" as const,
  },
  {
    label: "Secondary Power",
    skill: "JavaScript",
    tone: "blue" as const,
  },
  {
    label: "Developing Power",
    skill: "Data Structures",
    tone: "muted" as const,
  },
];

export const gaps: (Skill & {
  status: "current" | "gap" | "recommended";
})[] = [
  { name: "React", score: 91, status: "current" },
  { name: "Node.js", score: 72, status: "current" },
  { name: "Docker", score: 52, status: "gap" },
  { name: "System Design", score: 41, status: "gap" },
];

export const recommended = [
  "System Design",
  "Docker",
  "TypeScript",
  "AWS Basics",
];

export type CareerStage = {
  title: string;
  level: string;
  difficulty: number;
  required: string[];
  tech: string[];
  missing: string[];
};

export const careerPath: CareerStage[] = [
  {
    title: "Frontend Developer",
    level: "LVL 01",
    difficulty: 2,
    required: ["HTML/CSS", "JavaScript", "React"],
    tech: ["Vite", "Tailwind"],
    missing: [],
  },
  {
    title: "Full Stack Developer",
    level: "LVL 02",
    difficulty: 3,
    required: ["Node.js", "Databases", "REST APIs"],
    tech: ["Express", "MongoDB"],
    missing: ["MongoDB"],
  },
  {
    title: "Software Engineer",
    level: "LVL 03",
    difficulty: 4,
    required: ["Data Structures", "Testing", "Docker"],
    tech: ["Docker", "CI/CD"],
    missing: ["Docker", "Testing"],
  },
  {
    title: "Senior Software Engineer",
    level: "LVL 04",
    difficulty: 5,
    required: ["System Design", "Mentoring", "Architecture"],
    tech: ["AWS", "Kubernetes"],
    missing: ["System Design", "AWS"],
  },
];

export const roadmap = [
  {
    week: "01",
    title: "JavaScript Fundamentals",
    note: "Closures, async, the DOM.",
  },
  {
    week: "02",
    title: "React",
    note: "Components, hooks, state.",
  },
  {
    week: "03",
    title: "Node.js",
    note: "Servers, routing, APIs.",
  },
  {
    week: "04",
    title: "MongoDB",
    note: "Models, queries, indexes.",
  },
  {
    week: "05",
    title: "Full Stack Project",
    note: "Ship it end to end.",
  },
];