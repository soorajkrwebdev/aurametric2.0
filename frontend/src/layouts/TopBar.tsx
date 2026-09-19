import { Bell, Search } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopBar() {
  return (
    <header className="flex items-center gap-3 border-b border-line bg-paper/80 px-4 py-3 backdrop-blur lg:px-8">
      <div className="lg:hidden">
        <BrandMark showWordmark={false} />
      </div>

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
        <Input
          className="pl-10"
          placeholder="Search tasks, classes, or notes"
          aria-label="Search"
          disabled
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications" disabled>
          <Bell className="size-4.5" />
        </Button>
        <div className="grid size-10 place-items-center rounded-full bg-[linear-gradient(135deg,#5b4bff,#7d6bff)] text-sm font-semibold text-white">
          A
        </div>
      </div>
    </header>
  );
}
