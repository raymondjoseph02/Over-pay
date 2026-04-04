import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/type";
import { appUsers } from "../data/users";

interface AuthStore {
  currentUser: User;
  setCurrentUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUser: appUsers.find((user) => user.role === "admin") ?? appUsers[0],
      setCurrentUser: (user) => set({ currentUser: user }),
    }),
    { name: "overpay-auth" },
  ),
);
