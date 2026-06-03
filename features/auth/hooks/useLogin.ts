import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
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

      const nextPath = searchParams.get("next");

      if (nextPath?.startsWith("/")) {
        router.push(nextPath);
        return;
      }

      if (data.account.role === "owner") {
        router.push("/owner/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    },

    onError: (error) => {
      toast.error(getErrorMessage(error),{position:"bottom-center"});
    },
  });
}
