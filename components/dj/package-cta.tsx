"use client";

import { DJ_PACKAGE_EVENT } from "@/components/dj/dj-enquiry-form";

export default function PackageCta({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#quote"
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent(DJ_PACKAGE_EVENT, { detail: id }));
      }}
    >
      {children}
    </a>
  );
}
