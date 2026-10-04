import city from "@/assets/city.jpg";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";

export function FinalCta() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden py-28">
      <img src={city} alt="" loading="lazy" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-background/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 halftone opacity-20" />
      <div className="relative mx-auto w-full max-w-5xl px-5 text-center">
        <Reveal>
          <p className="terminal mb-8 text-xs text-secondary">System status: <span className="text-foreground">ready</span></p>
          <h2 className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
            Your story isn't <span className="text-primary text-glow-red">written</span> yet.
          </h2>
          <p className="mt-8 font-display text-xl uppercase tracking-widest text-muted-foreground sm:text-2xl">Discover what you're capable of.</p>
          <div className="mt-12 flex justify-center">
            <Button href="#upload">Start your journey</Button>
          </div>
          <p className="terminal mt-12 text-[11px] text-muted-foreground">Next mission: <span className="text-primary">yours</span></p>
        </Reveal>
      </div>
    </section>
  );
}
