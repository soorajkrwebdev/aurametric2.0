import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { SearchBar } from "@/components/SearchBar";
import { useDemoState } from "@/contexts/DemoStateContext";
import { demoProfile } from "@/lib/demoData";

export function Header() {
  const { unreadCount } = useDemoState();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-paper/90 px-4 py-3 backdrop-blur lg:px-8">
      <div className="lg:hidden">
        <Link to="/app" aria-label="Aurametric home">
          <BrandMark showWordmark={false} />
        </Link>
      </div>

      <SearchBar
        className="hidden max-w-md flex-1 md:block"
        placeholder="Search subjects, homework, exams"
        aria-label="Search"
        readOnly
      />

      <div className="ml-auto flex items-center gap-2">
        <Link
          to="/app/notifications"
          className="relative grid size-10 place-items-center rounded-full text-muted hover:bg-canvas hover:text-ink"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          {unreadCount > 0 ? (
            <span className="absolute top-2 right-2 size-2 rounded-full bg-amber" />
          ) : null}
        </Link>
        <Link
          to="/app/profile"
          className="grid size-10 place-items-center rounded-full bg-[linear-gradient(135deg,#5b4bff,#7d6bff)] text-sm font-semibold text-white"
          aria-label="Profile"
        >
          {demoProfile.initials}
        </Link>
      </div>
    </header>
  );
}
