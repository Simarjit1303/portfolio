"use client";

import { useEffect, useState } from "react";

export default function BerlinClock() {
  const [time, setTime] = useState("");
  const [tzAbbr, setTzAbbr] = useState("Local Time");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-DE", {
          timeZone: "Europe/Berlin",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
      try {
        const parts = new Intl.DateTimeFormat("en", {
          timeZone: "Europe/Berlin",
          timeZoneName: "short",
        }).formatToParts(new Date());
        const tzPart = parts.find((p) => p.type === "timeZoneName");
        if (tzPart) setTzAbbr(tzPart.value);
      } catch {
        setTzAbbr("Local Time");
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-2 mt-5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse shrink-0" />
      <span className="text-[10px] sm:text-[11px] font-mono text-white/55 tracking-[0.15em] sm:tracking-[0.18em] uppercase leading-tight">
        <span className="hidden sm:inline">Berlin, Germany — </span>
        <span className="sm:hidden">Berlin — </span>
        {time} {tzAbbr}
      </span>
    </div>
  );
}
