import * as React from "react";
import { clsx } from "clsx";

const variantClasses = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-800",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  ghost: "hover:bg-gray-100 text-gray-800",
  link: "text-blue-600 underline-offset-4 hover:underline",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm border transition-colors disabled:opacity-50 disabled:pointer-events-none";
    const variantClass = variantClasses[variant];
    return (
      <button className={clsx(baseClasses, variantClass, className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";
