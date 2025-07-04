import { Button } from "@repo/ui/button";

const FeatureCard = ({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <a
      href={href}
      className="block p-6 bg-white border border-zinc-200 rounded-lg shadow-sm transition-shadow hover:shadow-md dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </a>
  );
};

export default function Home() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-8 sm:p-16 md:p-24"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1721591183585-6e1ea29f3ce2')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <main className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-16">
        <header className="w-full space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-blue-400 sm:text-6xl">
            Tree of Life
          </h1>
          <p className="text-lg text-zinc-200 dark:text-zinc-300 md:text-xl">
            Your comprehensive guide to exploring, understanding, and
            contributing to the project.
          </p>
          <div className="pt-4">
            <Button appName="docs" className="px-8 py-3 text-lg">
              Get Started
            </Button>
          </div>
        </header>

        <section className="w-full">
          <h2 className="mb-8 text-3xl font-bold text-white">
            Explore the Documentation
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Introduction"
              description="What is the Tree of Life project? Get a high-level overview of our mission and goals."
              href="/docs/introduction"
            />
            <FeatureCard
              title="Installation"
              description="Step-by-step guide to get the project running on your local machine."
              href="/docs/installation"
            />
            <FeatureCard
              title="Contributing"
              description="Learn how you can contribute to the project and our code of conduct."
              href="/docs/contributing"
            />
            <FeatureCard
              title="Architecture"
              description="Dive deep into the technical architecture and design principles of the project."
              href="/docs/architecture"
            />
            <FeatureCard
              title="API Reference"
              description="Explore the complete API reference for all available endpoints and functions."
              href="/docs/api"
            />
            <FeatureCard
              title="Tutorials"
              description="Follow practical tutorials to learn how to use the project's features."
              href="/docs/tutorials"
            />
          </div>
        </section>
      </main>
      <footer className="relative z-10 mt-16 w-full max-w-5xl text-sm text-zinc-300">
        <p>Built with love for the Tree of Life project.</p>
      </footer>
    </div>
  );
}
