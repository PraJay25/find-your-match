import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "../../state/auth.store";

export function useLoginNavigation() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  useEffect(() => {
    if (token) router.replace("/(home)/home");
  }, [token]);
}

