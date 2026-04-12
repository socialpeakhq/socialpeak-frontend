import APIClient from "../apiClient";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterUser, User } from "./auth.types";

interface Response {
  access_token: string;
  data: User;
}

const apiClient = new APIClient<Response>(`/auth/signup`);

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterUser) => apiClient.post(payload),
    onSuccess: (successData) => {
      const { data, access_token } = successData;
      queryClient.setQueryData(["auth"], data);
    },
  });
};
