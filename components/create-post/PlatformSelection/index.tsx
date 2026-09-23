import { Box } from "@mui/material";
import { useEffect } from "react";
import usePostStore from "@/stores/usePostStore";
import { PLATFORM_KEYS, PLATFORM_LABEL } from "../constants";
import { PLATFORM_GLYPH } from "../icons";
import usePlatformAvailability from "../usePlatformAvailability";
import styles from "./styles.module.scss";

export default function PlatformSelection() {
  const { loaded, platforms: availability } = usePlatformAvailability();
  const platforms = usePostStore((s) => s.createPostData.platforms);
  const handleCreatePostPlatforms = usePostStore(
    (s) => s.handleCreatePostPlatforms,
  );
  const removeCreatePostPlatform = usePostStore(
    (s) => s.removeCreatePostPlatform,
  );

  const facebookDisabled = Boolean(availability.facebook.disabledReason);
  const instagramDisabled = Boolean(availability.instagram.disabledReason);

  // A platform that becomes unavailable is deselected, not just greyed out
  useEffect(() => {
    if (!loaded) return;
    if (facebookDisabled) removeCreatePostPlatform("facebook");
    if (instagramDisabled) removeCreatePostPlatform("instagram");
  }, [loaded, facebookDisabled, instagramDisabled, removeCreatePostPlatform]);

  return (
    <Box className={styles.platformRow}>
      {PLATFORM_KEYS.map((key) => {
        const { account, disabledReason } = availability[key];
        const on = !disabledReason && platforms.includes(key);

        return (
          <Box
            key={key}
            onClick={() => !disabledReason && handleCreatePostPlatforms(key)}
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
