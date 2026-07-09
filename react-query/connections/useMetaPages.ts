import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../apiClient";

const returnApi = (id: number) => {
  return new APIClient(`meta/workspace/${id}/accounts`);
};

export const useMetaPages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => returnApi(id).getAll(),
    onSuccess: (data) => {
      queryClient.setQueryData(["meta-accounts"], data);
    },
  });
};
