import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { MetaAccountsData } from "@/react-query/connections/connections.type";
import { skipToken, useQuery } from "@tanstack/react-query";
import { META_ACCOUNTS_QUERY_KEY } from "@/lib/metaAccountsQueryPersistence";
import usePostStore from "@/stores/usePostStore";
import { MAIN_PLATFORMS } from "@/pages/dashboard/constants";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ImageCarousel from "@/components/shared/ImageCarousel";

const PRIMARY_ACTIONS = [
  { label: "Like", icon: <FavoriteBorderIcon /> },
  { label: "Comment", icon: <ModeCommentOutlinedIcon /> },
  { label: "Share", icon: <SendOutlinedIcon /> },
];

export default function InstagramPreview() {
  const { data: metaAccounts } = useQuery<MetaAccountsData>({
    queryKey: META_ACCOUNTS_QUERY_KEY,
    queryFn: skipToken,
  });

  const postData = usePostStore((s) => s.createPostData);

  const facebookData =
    metaAccounts && Object.values(metaAccounts["instagram"])[0];

  return (
    <Box className={styles.previewContainer}>
      <Box className={styles.postInfoContainer}>
        <Box className={styles.iconContainer}>{MAIN_PLATFORMS[1].icon}</Box>
        <Box className={styles.accountInformation}>
          <Typography className={styles.accountName}>
            {facebookData?.label.slice(1, facebookData.label.length)}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.postImageContainer}>
        <ImageCarousel images={postData?.media} />
      </Box>
      <Box className={styles.postActionsContainer}>
        <Box className={styles.primaryActions}>
          {PRIMARY_ACTIONS.map((action) => (
            <Box className={styles.actionItem} key={action.label}>
              {action.icon}
            </Box>
          ))}
        </Box>
        <Box className={styles.actionItem}>
          <BookmarkBorderIcon />
        </Box>
      </Box>
      <Box className={styles.postCaptionContainer}>
        <Typography className={styles.caption}>
          <span>{facebookData?.label.slice(1, facebookData.label.length)}</span>
          &nbsp;&nbsp;
          {postData?.caption}
        </Typography>
      </Box>
    </Box>
  );
}
