import { create } from "zustand";
import Cookies from "js-cookie";
import type { Account } from "@/types/auth.types";

interface AuthState {
  user: Account | null;
  isAuthenticated: boolean;

  setAuth: (data: {
    user: Account;
    accessToken: string;
    refreshToken: string;
  }) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setAuth: ({ user, accessToken, refreshToken }) => {
    Cookies.set("access_token", accessToken);
    Cookies.set("refresh_token", refreshToken);

    set({
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");

    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
