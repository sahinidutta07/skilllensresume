import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import hero from "@/assets/hero.jpg";
import { Button } from "@/components/Button";
import { WebBackground } from "@/components/WebMark";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 sm:items-center sm:pb-0">
      <motion.img
        src={hero}
        alt="A lone hero stands on a rooftop above a red and blue lit city"
        width={1920}
        height={1088}
        style={{ scale, y }}
        className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      <div className="absolute inset-0 halftone opacity-25 mix-blend-overlay" />
      <WebBackground className="absolute -right-40 top-0 h-[120%] w-[90%] text-secondary/10 max-md:hidden" />
      {!reduce &&
        Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className={`animate-drift absolute h-1 w-1 ${i % 2 ? "bg-primary" : "bg-secondary"}`}
            style={{ left: `${(i * 37) % 100}%`, bottom: `${(i * 13) % 40}%`, animationDelay: `${i * 0.45}s` }}
          />
        ))}

      <motion.div style={{ y: textY }} className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="terminal mb-6 inline-block border border-secondary/50 bg-ink/70 px-3 py-1.5 text-[11px] text-secondary"
        >
          ● SKILL<span className="text-primary">LENS</span> // ISSUE #001
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, x: -40, skewX: -8 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="block">Everyone has</span>
          <span className="block">a power.</span>
          <span className="animate-glitch mt-2 block text-primary text-glow-red">Discover yours.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-lg text-lg text-muted-foreground"
        >
          Turn your experience into a skill profile, uncover your gaps, and discover where your abilities can take you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button href="#upload">Discover your power</Button>
          <Button href="#discover" variant="ghost">Explore SkillLens</Button>
        </motion.div>
        <p className="terminal mt-14 text-[11px] text-muted-foreground">
          Your journey starts here <span className="text-primary">→</span>
        </p>
      </motion.div>
    </section>
  );
}
