import { create } from "zustand";

export const useAuth = create((set) => ({
  user: null,
  token: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}));
