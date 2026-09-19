import { Search } from "lucide-react";
import { type InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = InputHTMLAttributes<HTMLInputElement>;

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
      <Input className="pl-10" {...props} />
    </div>
  );
}
