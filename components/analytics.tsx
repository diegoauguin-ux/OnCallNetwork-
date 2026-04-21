"use client";

import Script from "next/script";
import { useEffect } from "react";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };
type ClarityWindow = Window & { clarity?: ClarityFn };

export default function Analytics() {
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ type: string; meta?: Record<string, unknown> }>).detail;
      if (!detail) return;

      const w = window as ClarityWindow;

      if (typeof w.clarity === "function") {
        try {
          w.clarity("event", detail.type);
        } catch {
          /* noop */
        }
      }

      if (typeof window !== "undefined" && "plausible" in window) {
        try {
          (window as unknown as { plausible: (name: string, opts?: unknown) => void }).plausible(
            detail.type,
            { props: detail.meta ?? {} }
          );
        } catch {
          /* noop */
        }
      }
    };

    window.addEventListener("ocn:conversion", handler as EventListener);
    return () => window.removeEventListener("ocn:conversion", handler as EventListener);
  }, []);

  return (
    <>
      {CLARITY_ID ? (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
      ) : null}
      {PLAUSIBLE_DOMAIN ? (
        <Script
          strategy="afterInteractive"
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
      ) : null}
    </>
  );
}
