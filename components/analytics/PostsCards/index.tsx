import { usePostAnalytics } from "@/react-query/posts/usePostsAnalytics";
import useAnalyticsStore from "@/stores/useAnalyticsStore";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { useTotalCalculator } from "./useTotalCalculator";
import { Box } from "@mui/material";
import KpiCard from "../KpiCard";
import styles from "./styles.module.scss";

export default function PostsCards() {
  const workspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const filter = useAnalyticsStore((s) => s.filter);

  const posts = usePostAnalytics(workspaceId).data;

  const { current, change } = useTotalCalculator(posts, filter);

  return (
    <Box className={styles.container}>
      {Object.keys(current).map((key) => (
        <KpiCard
          key={key}
          label={key}
          value={current[key as keyof typeof current]}
          change={change[key as keyof typeof change]}
        />
      ))}
    </Box>
  );
}
