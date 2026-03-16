import APIClient from "../apiClient";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "./auth.types";

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
      const { data, access_token } = successData;
      queryClient.setQueryData(["auth"], data);
      console.log(access_token);
    },
  });
};
