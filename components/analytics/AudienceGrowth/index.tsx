import styles from "./styles.module.scss";
import { Box } from "@mui/material";
import { AreaChart, CartesianGrid, XAxis, YAxis, Area } from "recharts";

type IProps = {
  caller: string;
  data?: { id: number; value: number; date: string }[];
  areaFill?: string;
  lineFill?: string;
};

const TEST_DATA: { id: number; value: number; date: string }[] = [
  { id: 1, value: 500, date: "01/02/2026" },
  { id: 2, value: 900, date: "01/02/2026" },
  { id: 3, value: 900, date: "01/02/2026" },
  { id: 4, value: 900, date: "01/02/2026" },
];

export default function AudienceGrowth({
  data = TEST_DATA,
  caller,
  areaFill = "transparent",
  lineFill = "grey",
}: IProps) {
  return (
    <Box className={styles.audienceGrowthContainer}>
      <AreaChart data={data} title={caller} responsive className={styles.chart}>
        <CartesianGrid strokeDasharray="1 1" stroke="grey" />
        <XAxis dataKey="date" className={styles.xAxis} />
        <YAxis dataKey="value" width="auto" />
        <Area
          type="natural"
          dataKey="value"
          stroke={lineFill}
          fillOpacity={1}
          isAnimationActive
          animationBegin={200}
          animationDuration={1300}
          fill={areaFill}
        />
      </AreaChart>
    </Box>
  );
}
