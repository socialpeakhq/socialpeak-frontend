"use client";

import { usePostAnalytics } from "@/react-query/posts/usePostsAnalytics";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import CustomSwitch, { SwitchOption } from "@/components/shared/CustomSwitch";
import { useState } from "react";

const ANALYTICS_PAGES: SwitchOption<string>[] = [
  { label: "Posts Analytics", value: "posts" },
  { label: "Page Analytics", value: "page", disabled: true },
];

export default function AnalyticsPage() {
  const workspace = useWorkspaceStore((s) => s.selectedWorkspace?.workspace_id);
  usePostAnalytics(workspace);

  const [selectedAnalyicsValue, setSelectedAnalyticsValue] =
    useState<string>("posts");

  const handleSelected = (value: string) => {
    setSelectedAnalyticsValue(value);
  };

  return (
    <Box className={styles.analyticsPageContainer}>
      <Box className={styles.pageSwitchContainer}>
        <CustomSwitch
          options={ANALYTICS_PAGES}
          selectedValue={selectedAnalyicsValue}
          handleChange={handleSelected}
        />
      </Box>
    </Box>
  );
}
