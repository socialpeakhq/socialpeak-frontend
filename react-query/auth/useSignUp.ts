import APIClient from "../apiClient";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterUser, User } from "./auth.types";
import useAuthStore from "@/stores/useAuthStore";
import { NextResponse } from "next/server";

interface Response {
  access_token: string;
  data: User;
}

const apiClient = new APIClient<Response>(`/auth/signup`);

export const useSignUp = () => {
  const setAuthentication = useAuthStore((s) => s.setAuthentication);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterUser) => apiClient.post(payload),
    onSuccess: (successData) => {
      const response = NextResponse.json({ success: true });
      const { data, access_token } = successData;
      queryClient.setQueryData(["auth"], data);
      setAuthentication();
      response.cookies.set("token", access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
    },
  });
};
