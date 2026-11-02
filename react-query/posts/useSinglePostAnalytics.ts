import { useQuery } from "@tanstack/react-query";
import APIClient from "../apiClient";

const returnApiClient = (
  workspace_id: number,
  post_id: number,
  days?: number,
) => {
  return new APIClient(
    `post/analytics/${workspace_id}/${post_id}?days=${days}`,
  );
};

export const useSinglePostAnalytics = (
  post_id: number,
  workspace_id?: number,
  days?: number,
) => {
  const response = useQuery({
    queryKey: ["single-post-analytics", workspace_id, post_id],
    queryFn: () => workspace_id && returnApiClient(workspace_id, post_id, days),
    enabled: !!workspace_id,
  });

  return response;
};
