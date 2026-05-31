import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useRegisterUser() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authService.registerUser,

    onSuccess: (data) => {
      setAuth({
        user: data.user,
        accessToken: data.access,
        refreshToken: data.refresh,
      });

      toast.success("ثبت‌نام با موفقیت انجام شد");
      router.push("/user/dashboard");
    },

    onError: () => {
      toast.error("ثبت‌نام انجام نشد");
    },
  });
}
