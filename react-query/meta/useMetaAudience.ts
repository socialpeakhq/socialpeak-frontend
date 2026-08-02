import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../apiClient";
import { MetaPlatformInsight } from "../connections/connections.type";

const returnApi = (
  workspaceId: number,
  pageId: number,
  platform: string,
  date: string,
) => {
  return new APIClient(
    `/meta-insights/insights/audience/${workspaceId}/${pageId}/${platform}/${date}`,
  );
};

export const useMetaAudience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      workspaceId,
      pageId,
      platform,
      date,
    }: {
      workspaceId: number;
      pageId: number;
      platform: string;
      date: string;
    }) => returnApi(workspaceId, pageId, platform, date).getAll(),
    onSuccess: (data: MetaPlatformInsight[]) => {
      const newData = data.map((item) => {
        return {
          id: item.id,
          value: item.value,
          date: item.captured_at,
        };
      });
      queryClient.setQueryData(["audience-growth"], newData);
    },
  });
};
