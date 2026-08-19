import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { MAIN_PLATFORMS } from "@/pages/dashboard/constants";
import { MetaAccountsData } from "@/react-query/connections/connections.type";
import { useQueryClient } from "@tanstack/react-query";
import usePostStore from "@/stores/usePostStore";
import styles from "./styles.module.scss";

export default function PlatformSelection() {
  const metaAccounts: MetaAccountsData | undefined =
    useQueryClient().getQueryData(["meta-accounts"]);

  const platforms = usePostStore((s) => s.createPostData?.platforms);
  const handleCreatePostPlatforms = usePostStore(
    (s) => s.handleCreatePostPlatforms,
  );

  return (
    <Box className={styles.platforms}>
      {metaAccounts &&
        Object.keys(metaAccounts).map((el) => {
          const item = metaAccounts[el];
          const key = Object.keys(item)[0];
          const singlePlatform = Object.values(item)[0];

          return (
            <Box key={key} className={styles.singlePlatform}>
              <Box className={styles.leftSide}>
                <Box className={styles.iconContainer}>
                  {MAIN_PLATFORMS.find((item) => item.platform === el)?.icon}
                </Box>
                <Box className={styles.labelsContainer}>
                  <Typography className={styles.platformLabel}>
                    {el[0].toUpperCase() + el.substring(1)}
                  </Typography>
                  <Typography className={styles.usernameLabel}>
                    {singlePlatform.label}
                  </Typography>
                </Box>
              </Box>
              <FormControlLabel
                value={el}
                onChange={() => handleCreatePostPlatforms(el)}
                checked={Boolean(platforms && platforms.includes(el))}
                control={
                  <Checkbox
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                    sx={{
                      "&.Mui-checked": {
                        color: "var(--accent-purple) !important",
                      },
                    }}
                  />
                }
                label={""}
                className={styles.checkbox}
              />
            </Box>
          );
        })}
    </Box>
  );
}
