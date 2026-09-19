import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { allAppLinks, mobileNavItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-1 py-2 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMoreOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center gap-0.5 rounded-2xl py-1 text-[11px] font-medium",
                    isActive ? "text-primary" : "text-muted",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-2xl",
                        isActive && "bg-primary-soft",
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
          <button
            type="button"
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-2xl py-1 text-[11px] font-medium",
              moreOpen ? "text-primary" : "text-muted",
            )}
            onClick={() => setMoreOpen((open) => !open)}
          >
            <span
              className={cn(
                "grid size-8 place-items-center rounded-2xl",
                moreOpen && "bg-primary-soft",
              )}
            >
              {moreOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </span>
            More
          </button>
        </div>
      </nav>

      {moreOpen ? (
        <div className="fixed inset-x-0 bottom-16 z-30 px-3 pb-[env(safe-area-inset-bottom)] lg:hidden">
          <div className="mx-auto max-w-lg rounded-[1.5rem] border border-line bg-paper p-3 shadow-[var(--shadow-float)]">
            <div className="grid grid-cols-2 gap-1">
              {allAppLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMoreOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium",
                        isActive
                          ? "bg-primary-soft text-primary-dark"
                          : "text-muted hover:bg-canvas",
                      )
                    }
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
