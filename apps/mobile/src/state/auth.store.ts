import { create } from "zustand";

type AuthState = {
  token?: string;
  setToken: (token?: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: undefined,
  setToken: (token) => {
    (globalThis as any).__authToken__ = token;
    set({ token });
  }
}));

