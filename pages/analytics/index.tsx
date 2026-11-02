"use client";

import { usePostAnalytics } from "@/react-query/posts/usePostsAnalytics";
import useWorkspaceStore from "@/stores/useWorkspaceStore";

export default function AnalyticsPage() {
  const workspace = useWorkspaceStore((s) => s.selectedWorkspace?.workspace_id);
  usePostAnalytics(workspace);

  return <></>;
}
