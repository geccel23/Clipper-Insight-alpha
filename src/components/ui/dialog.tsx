import * as React from "react";
import { cn } from "@/lib/utils";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

export function Dialog({ isOpen, className, children, ...props }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50",
        className
      )}
      {...props}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg">{children}</div>
    </div>
  );
}
