import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { WebMark } from "./WebMark";
import { Button } from "./Button";

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Discover", href: "#discover" },
  { label: "Skill Analysis", href: "#analysis" },
  { label: "Career Paths", href: "#career" },
  { label: "About", href: "#about" },
];

export function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2.5 text-foreground">
      <WebMark className="h-7 w-7 text-primary" />
      <span className="font-display text-lg font-bold leading-none tracking-widest">
        SKILL<span className="text-secondary">LENS</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent"}`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="terminal text-xs text-muted-foreground transition-colors hover:text-foreground">{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          <Button href="#upload" className="px-5 py-2.5 text-xs">Get Started</Button>
        </div>
        <button aria-label={open ? "Close menu" : "Open menu"} className="p-2 lg:hidden" onClick={() => setOpen((o) => !o)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border bg-background lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a onClick={() => setOpen(false)} href={l.href} className="terminal block py-3 text-sm text-foreground">{l.label}</a>
                </li>
              ))}
              <li className="pt-3">
                <Button href="#upload" className="w-full">Get Started</Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
