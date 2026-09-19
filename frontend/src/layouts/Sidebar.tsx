import { Link, NavLink } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { useDemoState } from "@/contexts/DemoStateContext";
import { demoProfile } from "@/lib/demoData";
import { sidebarGroups } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { unreadCount } = useDemoState();

  return (
    <aside className="sticky top-0 hidden h-svh w-[272px] shrink-0 overflow-y-auto border-r border-line bg-paper lg:flex lg:flex-col">
      <div className="px-5 pt-6 pb-4">
        <Link to="/">
          <BrandMark />
        </Link>
        <p className="mt-3 text-sm leading-5 text-muted">
          Plan the week, keep work honest, protect a little time that isn’t academic.
        </p>
      </div>

      <nav className="flex-1 space-y-5 px-3 pb-4">
        {sidebarGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-1 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary-soft text-primary-dark"
                          : "text-muted hover:bg-canvas hover:text-ink",
                      )
                    }
                  >
                    <Icon className="size-[18px] shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.to === "/app/notifications" && unreadCount > 0 ? (
                      <span className="grid min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[10px] text-white">
                        {unreadCount}
                      </span>
                    ) : null}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="m-3 rounded-[1.25rem] border border-line bg-canvas p-3">
        <p className="text-sm font-medium">{demoProfile.name}</p>
        <p className="text-xs text-muted">
          Sem {demoProfile.semester} {demoProfile.section} · {demoProfile.course}
        </p>
      </div>
    </aside>
  );
}
