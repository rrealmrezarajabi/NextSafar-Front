import { api } from "./api";
import type {
  LoginPayload,
  LoginResponse,
  RegisterOwnerPayload,
  RegisterOwnerResponse,
  RegisterUserPayload,
  RegisterUserResponse,
  RefreshTokenResponse,
} from "@/types/auth.types";

export const authService = {
  login: async (payload: LoginPayload) => {
    const res = await api.post<LoginResponse>(
      "/api/accounts/account/login",
      payload,
    );

    return res.data;
  },

  registerUser: async (payload: RegisterUserPayload) => {
    const res = await api.post<RegisterUserResponse>(
      "/api/accounts/user/register/",
      payload,
    );

    return res.data;
  },

  registerOwner: async (payload: RegisterOwnerPayload) => {
    const res = await api.post<RegisterOwnerResponse>(
      "/api/accounts/owner/register/",
      payload,
    );

    return res.data;
  },

  refreshToken: async (refresh: string) => {
    const res = await api.post<RefreshTokenResponse>(
      "/api/accounts/refresh-token/",
      { refresh },
    );

    return res.data;
  },
};
