
import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function SelectTrigger({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border px-4 py-2 rounded-md cursor-pointer", className)} {...props} />;
}

export function SelectContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-2 border rounded-md bg-white shadow", className)} {...props} />;
}

export function SelectItem({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" {...props}>{children}</div>;
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <span className="text-gray-500">{placeholder}</span>;
}
