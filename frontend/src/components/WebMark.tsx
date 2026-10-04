export function WebMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="16" cy="16" r="4" />
      <circle cx="16" cy="16" r="9" strokeDasharray="3 2" />
      <circle cx="16" cy="16" r="14" />
      {[0, 45, 90, 135].map((a) => (
        <line key={a} x1="16" y1="2" x2="16" y2="30" transform={`rotate(${a} 16 16)`} />
      ))}
    </svg>
  );
}

export function WebBackground({ className = "" }: { className?: string }) {
  const rings = [60, 130, 210, 300, 400];
  return (
    <svg viewBox="-500 -500 1000 1000" className={className} fill="none" stroke="currentColor" aria-hidden preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="0" y1="0" x2="0" y2="-700" strokeWidth="1" transform={`rotate(${i * 30})`} />
      ))}
      {rings.map((r) => (
        <polygon
          key={r}
          strokeWidth="1"
          points={Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            return `${Math.sin(a) * r},${-Math.cos(a) * r}`;
          }).join(" ")}
        />
      ))}
    </svg>
  );
}
