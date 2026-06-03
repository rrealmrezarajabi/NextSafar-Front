import { api } from "./api";

import type {
  LoginPayload,
  RegisterOwnerPayload,
  RegisterUserPayload,
} from "@/schemas/auth.schema";

import type {
  LoginResponse,
  RegisterOwnerResponse,
  RegisterUserResponse,
  RefreshTokenResponse,
  UserProfile,
} from "@/types/auth.types";

export const authService = {
  login: async (payload: LoginPayload) => {
    const res = await api.post<LoginResponse>("/api/account/login", payload);

    return res.data;
  },

  registerUser: async (payload: RegisterUserPayload) => {
    const res = await api.post<RegisterUserResponse>(
      "/api/user/register/",
      payload,
    );

    return res.data;
  },

  registerOwner: async (payload: RegisterOwnerPayload) => {
    const res = await api.post<RegisterOwnerResponse>(
      "/api/owner/register/",
      payload,
    );

    return res.data;
  },

  refreshToken: async (refresh: string) => {
    const res = await api.post<RefreshTokenResponse>(
      "/api/refresh-token/",
      { refresh },
    );

    return res.data;
  },

  me: async () => {
    const res = await api.get<UserProfile>("/api/accounts/me/");

    return res.data;
  },
};
