import { QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode } from "react";
import { DemoStateProvider } from "@/contexts/DemoStateContext";
import { AuthProvider } from "@/hooks/useAuth";
import { queryClient } from "@/lib/queryClient";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DemoStateProvider>{children}</DemoStateProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
