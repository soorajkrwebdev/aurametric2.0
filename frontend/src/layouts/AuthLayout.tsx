import { Link, Outlet } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";

export function AuthLayout() {
  return (
    <div className="min-h-svh overflow-x-hidden bg-[linear-gradient(180deg,#f6f4fb_0%,#ffffff_42%,#eefbf4_100%)]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5">
        <Link to="/">
          <BrandMark />
        </Link>
        <Link to="/app" className="text-sm font-medium text-primary">
          View demo
        </Link>
      </header>
      <main className="mx-auto flex max-w-md flex-col px-4 pb-16">
        <Outlet />
      </main>
    </div>
  );
}
