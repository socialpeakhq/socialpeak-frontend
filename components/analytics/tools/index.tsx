import { Box } from "@mui/material";
import styles from "./styles.module.scss";
import useAnalyticsStore, {
  PeriodType,
  PlatformValues,
  PostType,
} from "@/stores/useAnalyticsStore";
import CustomSwitch, { SwitchProps } from "@/components/shared/CustomSwitch";

export default function AnalyticsTools() {
  const filters = useAnalyticsStore((s) => s.filter);
  const handleFilterChange = useAnalyticsStore((s) => s.handleFilterChange);

  const TOOLS_SWITCHES: SwitchProps<string | number | boolean>[] = [
    {
      label: "PLATFORM",
      handleChange: (value: string | number | boolean) => {
        handleFilterChange("platform", value as PlatformValues);
      },
      options: [
        {
          label: "All",
          value: "all",
        },
        {
          label: "Facebook",
          value: "facebook",
        },
        {
          label: "Instagram",
          value: "instagram",
        },
      ],
      selectedValue: filters.platform,
    },
    {
      label: "TYPE",
      handleChange: (value: string | number | boolean) => {
        handleFilterChange("type", value as PostType);
      },
      options: [
        {
          label: "All",
          value: "all",
        },
        {
          label: "Post",
          value: "post",
        },
        {
          label: "Video/Reel",
          value: "reel",
        },
        {
          label: "Story",
          value: "story",
        },
      ],
      selectedValue: filters.type,
    },
    {
      label: "PERIOD",
      handleChange: (value: string | number | boolean) => {
        handleFilterChange("period", value as PeriodType);
      },
      options: [
        {
          label: "7D",
          value: 7,
        },
        {
          label: "30D",
          value: 30,
        },
        {
          label: "90D",
          value: 90,
        },
      ],
      selectedValue: filters.period,
    },
  ];

  return (
    <Box className={styles.toolsContainer}>
      {TOOLS_SWITCHES.map((toolData, index) => (
        <CustomSwitch
          key={index}
          handleChange={toolData.handleChange}
          options={toolData.options}
          selectedValue={toolData.selectedValue}
          label={toolData.label}
        />
      ))}
    </Box>
  );
}
