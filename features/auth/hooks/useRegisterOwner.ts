import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useRegisterOwner() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authService.registerOwner,

    onSuccess: (data) => {
      setAuth({
        user: data.owner,
        accessToken: data.access,
        refreshToken: data.refresh,
      });

      toast.success("ثبت‌نام شرکت با موفقیت انجام شد");
      router.push("/owner/dashboard");
    },

    onError: () => {
      toast.error("ثبت‌نام شرکت انجام نشد");
    },
  });
}
