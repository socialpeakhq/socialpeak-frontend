import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../apiClient";

const returnApi = (workspaceId: number, pageId: number) => {
  return new APIClient(
    `meta-insights/workspace/insights/${workspaceId}/${pageId}/manual`,
  );
};

export const useMetaManualRefresh = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      workspaceId,
      pageId,
    }: {
      workspaceId: number;
      pageId: number;
    }) => returnApi(workspaceId, pageId).getAll(),
    onSuccess: (_data, { workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: ["insights", workspaceId] });
    },
  });
};
