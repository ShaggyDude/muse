import * as React from "react";
import { clsx } from "clsx";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <b
    ref={ref}
    className={clsx("rounded-lg border p-6 shadow", className)}
    {...props}
  />
));
Card.displayName = "Card";
