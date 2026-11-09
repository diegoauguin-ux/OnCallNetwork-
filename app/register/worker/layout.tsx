import type { Metadata } from "next";

// Legacy worker registration: keep it out of the index and stop it inheriting the home canonical.
export const metadata: Metadata = {
  title: "Worker registration",
  robots: { index: false, follow: false },
  alternates: { canonical: "/register/worker" },
};

export default function WorkerRegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
