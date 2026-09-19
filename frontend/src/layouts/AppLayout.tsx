import { Outlet } from "react-router-dom";
import { BottomNav } from "@/layouts/BottomNav";
import { Sidebar } from "@/layouts/Sidebar";
import { TopBar } from "@/layouts/TopBar";

export function AppLayout() {
  return (
    <div className="flex min-h-svh bg-canvas">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-4 py-6 pb-24 lg:px-8 lg:pb-8">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
