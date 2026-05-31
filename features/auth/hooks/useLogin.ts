import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authService.login,

    onSuccess: (data) => {
      setAuth({
        user: data.account,
        accessToken: data.access,
        refreshToken: data.refresh,
      });

      toast.success("ورود با موفقیت انجام شد");

      if (data.account.role === "owner") {
        router.push("/owner/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    },

    onError: () => {
      toast.error("شماره موبایل یا رمز عبور اشتباه است");
    },
  });
}
