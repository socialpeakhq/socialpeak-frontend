import APIClient from "../apiClient";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "./auth.types";
import { NextResponse } from "next/server";

interface Response {
  access_token: string;
  data: User;
}

const apiClient = new APIClient<Response>(`/auth/login`);

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      apiClient.post(payload),
    onSuccess: (successData) => {
      const response = NextResponse.json({ success: true });
      const { data, access_token } = successData;
      queryClient.setQueryData(["auth"], data);
      response.cookies.set("token", access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
    },
  });
};
