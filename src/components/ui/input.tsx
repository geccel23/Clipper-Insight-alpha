import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
