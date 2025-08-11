import "react-native-gesture-handler";
import "react-native-reanimated";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useAuthStore } from "../src/state/auth.store";
import { useEffect } from "react";

export default function RootLayout() {
  const [client] = useState(() => new QueryClient());
  const token = useAuthStore((s) => s.token);
  useEffect(() => {
    (globalThis as any).__authToken__ = token;
  }, [token]);
  return (
    <QueryClientProvider client={client}>
      <Slot />
    </QueryClientProvider>
  );
}

