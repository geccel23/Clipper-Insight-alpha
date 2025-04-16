
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      className={cn(
        "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button };
