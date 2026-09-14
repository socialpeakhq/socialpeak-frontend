import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { MetaAccountsData } from "@/react-query/connections/connections.type";
import { skipToken, useQuery } from "@tanstack/react-query";
import { META_ACCOUNTS_QUERY_KEY } from "@/lib/metaAccountsQueryPersistence";
import usePostStore from "@/stores/usePostStore";
import { MAIN_PLATFORMS } from "@/pages/dashboard/constants";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ImageCarousel from "@/components/shared/ImageCarousel";

const POST_ACTIONS = [
  { label: "Like", icon: <ThumbUpOffAltIcon /> },
  { label: "Comment", icon: <ChatBubbleOutlineIcon /> },
  { label: "Share", icon: <ShareOutlinedIcon /> },
];

export default function FacebookPreview() {
  const { data: metaAccounts } = useQuery<MetaAccountsData>({
    queryKey: META_ACCOUNTS_QUERY_KEY,
    queryFn: skipToken,
  });

  const postData = usePostStore((s) => s.createPostData);

  const facebookData =
    metaAccounts && Object.values(metaAccounts["facebook"])[0];

  return (
    <Box className={styles.previewContainer}>
      <Box className={styles.postInfoContainer}>
        <Box className={styles.iconContainer}>{MAIN_PLATFORMS[0].icon}</Box>
        <Box className={styles.accountInformation}>
          <Typography className={styles.accountName}>
            {facebookData?.label}
          </Typography>
          <Typography className={styles.dateLabel}>
            {postData?.schedule_time ? postData.schedule_time : "Now"}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.postCaptionContainer}>
        <Typography className={styles.caption}>{postData?.caption}</Typography>
      </Box>
      <Box className={styles.postImageContainer}>
        <ImageCarousel images={postData?.media} />
      </Box>
      <Box className={styles.postActionsContainer}>
        {POST_ACTIONS.map((action) => (
          <Box className={styles.actionItem} key={action.label}>
            {action.icon}
            <Typography className={styles.actionLabel}>
              {action.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
