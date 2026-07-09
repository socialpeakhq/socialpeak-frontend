"use client";

import APIClient from "../apiClient";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { User } from "./auth.types";

interface Response {
  access_token: string;
  data: {
    data: User;
    message: string;
    access_token: string;
    refresh_token: string;
  };
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
      const { data } = successData;
      setAuthentication(data.access_token);
      queryClient.setQueryData(["auth"], data.data);
      router.replace("/app/dashboard");
    },
  });
};
