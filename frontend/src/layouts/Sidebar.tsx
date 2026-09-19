import { NavLink } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-line bg-paper lg:flex lg:flex-col">
      <div className="px-6 pt-7 pb-5">
        <BrandMark />
        <p className="mt-3 text-sm leading-5 text-muted">
          A quieter way to plan study days, keep tasks honest, and protect focus.
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-soft text-primary-dark"
                    : "text-muted hover:bg-canvas hover:text-ink",
                )
              }
            >
              <Icon className="size-[18px]" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="m-4 rounded-[1.25rem] bg-[linear-gradient(180deg,#f3f0ff_0%,#eefbf4_100%)] p-4">
        <p className="font-display text-[15px] font-semibold text-ink">
          Study in seasons
        </p>
        <p className="mt-1 text-xs leading-5 text-muted">
          Track the week, not every minute. More tools will land here as we
          build.
        </p>
      </div>
    </aside>
  );
}
