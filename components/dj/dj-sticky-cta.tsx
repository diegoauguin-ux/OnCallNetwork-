"use client";

import { useEffect, useState } from "react";

// Mobile-only bottom bar with the main call to action. It hides while the quote
// form is on screen so it never covers the form.
export default function DjStickyCta({ label = "Get a free quote" }: { label?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const quote = document.getElementById("quote");
    let pastHero = window.scrollY > 500;
    let quoteVisible = false;
    const update = () => setShow(pastHero && !quoteVisible);
    const onScroll = () => {
      pastHero = window.scrollY > 500;
      update();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    let io: IntersectionObserver | undefined;
    if (quote && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([entry]) => {
        quoteVisible = entry.isIntersecting;
        update();
      });
      io.observe(quote);
    }
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-5 py-3 backdrop-blur transition-transform duration-200 lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <a href="#quote" tabIndex={show ? 0 : -1} className="btn btn-accent h-12 w-full">
        {label}
      </a>
    </div>
  );
}
