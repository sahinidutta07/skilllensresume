type CareerStage = {
  title: string;
  level: string;
};

export function CareerNode({
  stage,
  active,
  onSelect,
  index,
}: {
  stage: CareerStage;
  active: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <button
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      className={`relative w-full text-left transition-all duration-300 ${
        active ? "translate-x-2" : ""
      }`}
    >
      <div
        className={`flex items-center gap-4 border-2 p-4 sm:p-5 ${
          active
            ? "border-primary bg-card glow-red"
            : "border-border bg-card/60 hover:border-secondary"
        }`}
      >
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center border-2 font-mono text-sm ${
            active
              ? "border-primary text-primary"
              : "border-secondary text-secondary"
          }`}
        >
          0{index + 1}
        </span>

        <div className="min-w-0">
          <p className="terminal text-[10px] text-muted-foreground">
            {stage.level}
          </p>

          <p className="font-display text-lg font-bold uppercase leading-tight sm:text-xl">
            {stage.title}
          </p>
        </div>
      </div>
    </button>
  );
}