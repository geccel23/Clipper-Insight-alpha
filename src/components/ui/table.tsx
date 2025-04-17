import * as React from "react";
import { cn } from "@/lib/utils";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export function Table({ className, ...props }: TableProps) {
  return (
    <table
      className={cn("min-w-full border border-gray-200 text-sm", className)}
      {...props}
    />
  );
}
