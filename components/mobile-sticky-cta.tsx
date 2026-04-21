"use client";

import { useEffect, useState } from "react";

export default function MobileStickyCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    const apply = document.getElementById("apply");

    if (!contact && !apply) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isInContactOrApply = entries.some(
          (entry) => entry.isIntersecting && (entry.target.id === "contact" || entry.target.id === "apply")
        );
        setHidden(isInContactOrApply);
      },
      { threshold: 0.2 }
    );

    if (contact) observer.observe(contact);
    if (apply) observer.observe(apply);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`md:hidden fixed left-0 right-0 bottom-0 z-40 h-[60px] px-3 py-2 backdrop-blur bg-[#0f1e32]/90 border-t border-white/15 transition-transform duration-200 ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}
    >
      <div className="grid grid-cols-2 gap-2 h-full">
        <a
          href="/#contact?service=permanent"
          className="h-full rounded-lg bg-[#d4a853] text-[#1e3a5f] font-semibold text-sm inline-flex items-center justify-center"
        >
          Get a Quote
        </a>
        <a
          href="/#apply"
          className="h-full rounded-lg border border-white/40 text-white font-semibold text-sm inline-flex items-center justify-center"
        >
          Apply to Work
        </a>
      </div>
    </div>
  );
}
