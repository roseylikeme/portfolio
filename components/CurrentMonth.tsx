"use client";

import { useEffect, useState } from "react";

const label = (d: Date) =>
  d.toLocaleString("en-US", { month: "long", year: "numeric" });
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

/* The visitor's current month. The page is static, so anything computed on the
   server freezes at build time: the server passes its build date as the
   first render (so hydration matches), and the real month swaps in on mount. */
export function CurrentMonth({ builtAt }: { builtAt: string }) {
  const [date, setDate] = useState(() => new Date(builtAt));

  useEffect(() => setDate(new Date()), []);

  return <time dateTime={iso(date)}>{label(date)}</time>;
}
