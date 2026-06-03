import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { getErrorMessage } from "@/utils/getErrorMessage";

export function useRegisterUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
      const nextPath = searchParams.get("next");

      if (nextPath?.startsWith("/")) {
        router.push(nextPath);
        return;
      }

      router.push("/user/dashboard");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error) , {position:"bottom-center"});
    },
  });
}
