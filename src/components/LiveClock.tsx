import { useEffect, useState } from "react";

const format = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(d);

/**
 * Real-time digital clock shown in the header (WIB / Asia-Jakarta).
 * Announced politely so screen readers are not spammed every second.
 */
const LiveClock = () => {
  const [now, setNow] = useState(() => format(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setNow(format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      data-testid="live-clock"
      className="hidden sm:flex items-center gap-1.5 rounded-md border border-border/60 bg-muted/50 px-2 py-1 font-mono text-xs tabular-nums text-muted-foreground"
    >
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse"
      />
      <time aria-label={`Current time ${now} WIB`}>
        {now} <span className="text-primary">WIB</span>
      </time>
    </div>
  );
};

export default LiveClock;