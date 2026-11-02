import { useQuery } from "@tanstack/react-query";
import APICliet from "../apiClient";

const returnApiClient = (workspace_id: number) => {
  return new APICliet(`post/analytics/${workspace_id}`);
};

export const usePostAnalytics = (workspace_id?: number) => {
  const response = useQuery({
    queryKey: ["posts-analytics", workspace_id],
    queryFn: () => workspace_id && returnApiClient(workspace_id).getAll(),
    enabled: !!workspace_id,
  });
  return response;
};
