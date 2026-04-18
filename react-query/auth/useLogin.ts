"use client";

import APIClient from "../apiClient";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "./auth.types";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

interface Response {
  access_token: string;
  data: User;
}

const apiClient = new APIClient<Response>(`/auth/login`);

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setAuthentication = useAuthStore((s) => s.setAuthentication);
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      apiClient.post(payload),
    onSuccess: (successData) => {
      const { data, access_token } = successData;
      setAuthentication(access_token);
      queryClient.setQueryData(["auth"], data);
      router.replace("/app/dashboard");
    },
  });
};
