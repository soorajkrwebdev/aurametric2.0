import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { SearchBar } from "@/components/SearchBar";
import { useAuth } from "@/hooks/useAuth";
import { notificationService } from "@/services/notificationService";
import { profileService } from "@/services/profileService";

export function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationService.list,
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: profileService.get,
  });

  const unreadCount = notifications.filter((item) => !item.is_read).length;
  const initials =
    profile?.name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((item) => item[0]?.toUpperCase() ?? "")
      .join("") ?? "ST";

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

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
          {initials}
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-primary hover:text-primary"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
