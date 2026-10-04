import APIClient from "../apiClient";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterUser, User } from "./auth.types";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { AUTH_QUERY_KEY } from "./useAuthDetails";

interface Response {
  data: {
    data: User;
    message: string;
    access_token: string;
    refresh_token: string;
  };
}

const apiClient = new APIClient<Response>(`/auth/signup`);

export const useSignUp = () => {
  const setAuthentication = useAuthStore((s) => s.setAuthentication);
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterUser) => apiClient.post(payload),
    onSuccess: (successData) => {
      const { data } = successData;
      queryClient.setQueryData(AUTH_QUERY_KEY, data.data);
      setAuthentication(data.access_token, data.refresh_token);
      router.push("/app/dashboard");
    },
  });
};
