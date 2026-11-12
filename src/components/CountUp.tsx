"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/** Animates a number from 0 to `target` while `active`; resets to 0 when inactive. */
export function useCountUp(target: number, active: boolean, duration = 1.2) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    const controls = animate(0, target, { duration, ease: "easeOut", onUpdate: setN });
    return () => controls.stop();
  }, [target, active, duration]);
  return n;
}

/** Counts up the first number inside a label like "-85%", "< 2%" or "3.7x" once it scrolls into view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const m = value.match(/^(.*?)(\d+(?:\.\d+)?)(.*)$/);
  const n = useCountUp(m ? parseFloat(m[2]) : 0, inView);
  return <span ref={ref}>{m ? `${m[1]}${n.toFixed(m[2].includes(".") ? 1 : 0)}${m[3]}` : value}</span>;
}
