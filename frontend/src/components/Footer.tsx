import { Code2 as Github } from "lucide-react";
import { Logo, navLinks } from "./Navbar";

export function Footer() {
  return (
    <footer id="about" className="border-t border-border bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">Turn your skills into your superpower.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {navLinks.map((l) => (
            <li key={l.href}><a href={l.href} className="terminal text-xs text-muted-foreground hover:text-foreground">{l.label}</a></li>
          ))}
          <li>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="terminal inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-border">
        <p className="terminal mx-auto max-w-7xl px-5 py-4 text-[10px] text-muted-foreground lg:px-8">© {new Date().getFullYear()} SkillLens · build v0.1 · status: online</p>
      </div>
    </footer>
  );
}
