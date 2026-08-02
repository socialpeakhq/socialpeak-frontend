import { useMutation } from "@tanstack/react-query";
import APIClient from "../apiClient";

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
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
