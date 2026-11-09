"use client";

import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import CustomSwitch, { SwitchOption } from "@/components/shared/CustomSwitch";
import { useState } from "react";
import AnalyticsTools from "@/components/analytics/Tools";
import PostsCards from "@/components/analytics/PostsCards";
import ViewsByPost from "@/components/analytics/ViewsByPost";
import PostsList from "@/components/analytics/PostsList";

const ANALYTICS_PAGES: SwitchOption<string>[] = [
  { label: "Posts Analytics", value: "posts" },
  { label: "Page Analytics", value: "page", disabled: true },
];

export default function AnalyticsPage() {
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
      <AnalyticsTools />
      <PostsCards />
      <ViewsByPost />
      <PostsList />
    </Box>
  );
}
