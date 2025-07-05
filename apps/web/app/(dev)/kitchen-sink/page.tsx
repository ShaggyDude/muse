import { componentsMeta } from "@repo/ui/meta";

// A simple helper component to organize the kitchen sink
const ComponentExample = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-8 rounded-lg border p-4">
    <h2 className="mb-4 border-b pb-2 text-xl font-bold">{title}</h2>
    <div className="flex flex-wrap items-start gap-4">{children}</div>
  </div>
);

export default function KitchenSinkPage() {
  return (
    <main className="p-9">
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-3xl">Component Kitchen Sink</h1>
        <hr className="my-4 border" />
        <s className="bg-linear-to-r from-amber-500 via-orange-500 to-red-500 p-2 rounded-sm"></s>

        <b className="p-12 border rounded"></b>
        {componentsMeta.map((meta) => (
          <ComponentExample key={meta.title} title={meta.title}>
            {meta.examples.map((example) => (
              <b key={example.name} className="flex flex-col items-center gap-2">
                {example.component}
                <s className="text-xs">{example.name}</s>
              </b>
            ))}
          </ComponentExample>
        ))}
      </div>
    </main>
  );
}