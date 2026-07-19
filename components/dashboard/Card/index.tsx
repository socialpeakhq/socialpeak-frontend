import { MetaPlatformInsight } from "@/react-query/connections/connections.type";
import styles from "./styles.module.scss";
import { Box, Typography } from "@mui/material";
import AreaChartIcon from "@mui/icons-material/AreaChart";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CachedIcon from "@mui/icons-material/Cached";
import useWorkspaceStore from "@/stores/useWorkspaceStore";

const icons = {
  instagram: {
    reach: AreaChartIcon,
    profile_views: PersonSearchIcon,
    likes: FavoriteIcon,
    comments: CommentIcon,
    views: RemoveRedEyeIcon,
    reposts: CachedIcon,
  },
} as const;

type IProps = {
  data: MetaPlatformInsight;
};

export default function Card({ data }: IProps) {
  const selectedPlatform = useWorkspaceStore((s) => s.selectedPlatform);
  const platformIcons = icons[selectedPlatform as keyof typeof icons];
  const IconComponent =
    platformIcons?.[data.metric as keyof typeof platformIcons];

  return (
    <Box className={styles.cardContainer}>
      <Box className={styles.topContainer}>
        <Box className={styles.iconContainer}>
          {IconComponent ? <IconComponent /> : null}
        </Box>
        <Typography className={styles.metricValue}>{data.value}</Typography>
      </Box>
      <Typography className={styles.metricLabel}>
        {data.metric
          .split("_")
          .map((value) => value[0].toUpperCase() + value.substring(1) + " ")}
      </Typography>
    </Box>
  );
}
