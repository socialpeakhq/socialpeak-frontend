import { useQuery } from "@tanstack/react-query";
import APIClient from "../apiClient";
import { SinglePostAnalytics } from "./posts.type";

const returnApiClient = (
  workspace_id: number,
  post_id: number,
  days?: number,
) => {
  return new APIClient<SinglePostAnalytics>(
    `post/analytics/${workspace_id}/${post_id}?days=${days}`,
  );
};

export const useSinglePostAnalytics = (
  post_id?: number,
  workspace_id?: number,
  days?: number,
) => {
  const response = useQuery<SinglePostAnalytics>({
    queryKey: ["single-post-analytics", workspace_id, post_id, days],
    queryFn: () => returnApiClient(workspace_id!, post_id!, days).getAll(),
    enabled: !!workspace_id && !!post_id,
  });

  return response;
};
