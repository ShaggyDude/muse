import { notFound } from "next/navigation";

// This layout ensures that all routes in the (dev) group are only
// accessible in the development environment. It's a clean way to
// add developer-only pages without cluttering production builds.
export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return <>{children}</>;
}
