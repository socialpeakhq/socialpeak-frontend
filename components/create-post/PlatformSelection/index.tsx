import { Box } from "@mui/material";
import { useEffect } from "react";
import usePostStore, { PostDataKey } from "@/stores/usePostStore";
import { PLATFORM_KEYS, PLATFORM_LABEL } from "../constants";
import { PLATFORM_GLYPH } from "../icons";
import usePlatformAvailability from "../usePlatformAvailability";
import styles from "./styles.module.scss";

type IProps = {
  dataKey?: PostDataKey;
};

export default function PlatformSelection({
  dataKey = "createPostData",
}: IProps) {
  const { loaded, platforms: availability } = usePlatformAvailability(dataKey);
  const platforms = usePostStore((s) => s[dataKey].platforms);
  const handleCreatePostPlatforms = usePostStore(
    (s) => s.handleCreatePostPlatforms,
  );
  const removeCreatePostPlatform = usePostStore(
    (s) => s.removeCreatePostPlatform,
  );

  const facebookDisabled = Boolean(availability.facebook.disabledReason);
  const instagramDisabled = Boolean(availability.instagram.disabledReason);

  useEffect(() => {
    if (!loaded) return;
    if (facebookDisabled) removeCreatePostPlatform("facebook", dataKey);
    if (instagramDisabled) removeCreatePostPlatform("instagram", dataKey);
  }, [
    loaded,
    facebookDisabled,
    instagramDisabled,
    removeCreatePostPlatform,
    dataKey,
  ]);

  return (
    <Box className={styles.platformRow}>
      {PLATFORM_KEYS.map((key) => {
        const { account, disabledReason } = availability[key];
        const on = !disabledReason && platforms.includes(key);

        return (
          <Box
            key={key}
            onClick={() =>
              !disabledReason && handleCreatePostPlatforms(key, dataKey)
            }
            className={`${styles.platformToggle} ${on ? styles.on : ""} ${disabledReason ? styles.disabled : ""}`}
          >
            <Box className={styles.platformIcon}>{PLATFORM_GLYPH[key]}</Box>
            <Box>
              <Box className={styles.platformName}>{PLATFORM_LABEL[key]}</Box>
              {disabledReason ? (
                <Box className={styles.platformConnect}>{disabledReason}</Box>
              ) : (
                <Box className={styles.platformHandle}>{account?.label}</Box>
              )}
            </Box>
            {!disabledReason && <Box className={styles.platformCheck} />}
          </Box>
        );
      })}
    </Box>
  );
}
