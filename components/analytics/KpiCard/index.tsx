import { Box, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import styles from "./styles.module.scss";

export type KpiCardProps = {
  label: string;
  value: number | string;
  change?: number | null;
  description?: string;
  info?: string;
};

const formatCompact = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

export default function KpiCard({
  label,
  value,
  change,
  description,
  info,
}: KpiCardProps) {
  const displayValue = typeof value === "number" ? formatCompact(value) : value;
  const isNegative = typeof change === "number" && change < 0;

  return (
    <Box className={styles.kpiCard}>
      <Box className={styles.header}>
        <Box className={styles.labelWrapper}>
          <Typography className={styles.label}>{label}</Typography>
          {info && (
            <Tooltip title={info} arrow>
              <InfoOutlinedIcon className={styles.infoIcon} />
            </Tooltip>
          )}
        </Box>

        {change === null && (
          <Tooltip
            title="No data in the previous period to compare against."
            arrow
          >
            <Box className={`${styles.change} ${styles.neutral}`}>—</Box>
          </Tooltip>
        )}

        {typeof change === "number" && (
          <Box
            className={`${styles.change} ${isNegative ? styles.negative : styles.positive}`}
          >
            {isNegative ? (
              <SouthEastIcon className={styles.changeIcon} />
            ) : (
              <NorthEastIcon className={styles.changeIcon} />
            )}
            {isNegative ? "" : "+"}
            {change.toFixed(1)}%
          </Box>
        )}
      </Box>

      <Typography className={styles.value}>{displayValue}</Typography>

      {description && (
        <Typography className={styles.description}>{description}</Typography>
      )}
    </Box>
  );
}
