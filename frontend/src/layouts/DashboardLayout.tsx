import { Outlet } from "react-router-dom";
import { Header } from "@/layouts/Header";
import { MobileNavigation } from "@/layouts/MobileNavigation";
import { Sidebar } from "@/layouts/Sidebar";

export function DashboardLayout() {
  return (
    <div className="flex min-h-svh overflow-x-hidden bg-canvas">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="min-w-0 flex-1 px-4 py-6 pb-24 lg:px-8 lg:pb-8">
          <Outlet />
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
}
