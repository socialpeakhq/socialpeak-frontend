import { useQuery } from "@tanstack/react-query";
import APIClient from "../apiClient";
import { MetaPlatformInsight } from "./connections.type";

const returnApi = (workspaceId: number, platform: string) => {
  return new APIClient<MetaPlatformInsight[]>(
    `/meta-insights/workspace/${workspaceId}/${platform}`,
  );
};

export const useMetaInsightsByPlatform = (
  workspaceId: number | undefined,
  platform: string,
) => {
  const response = useQuery({
    queryKey: ["insights", workspaceId, platform],
    queryFn: () => workspaceId && returnApi(workspaceId, platform).getAll(),
    enabled: !!workspaceId && !!platform,
    staleTime: Infinity,
  });

  return response;
};
