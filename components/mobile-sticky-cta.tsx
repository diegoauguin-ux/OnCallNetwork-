"use client";

import { useEffect, useState } from "react";

export default function MobileStickyCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = ["contact", "apply"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => setHidden(entries.some((e) => e.isIntersecting)),
      { threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-4 pt-3 backdrop-blur transition-transform duration-200 md:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 12px)" }}
    >
      <div className="grid grid-cols-2 gap-2">
        <a href="#contact" className="btn btn-solid h-11 text-[14px]">Hire staff</a>
        <a href="#apply" className="btn btn-outline h-11 text-[14px]">Apply to work</a>
      </div>
    </div>
  );
}
