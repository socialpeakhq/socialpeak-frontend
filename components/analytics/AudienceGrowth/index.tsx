import styles from "./styles.module.scss";
import { Box } from "@mui/material";
import { AreaChart, CartesianGrid, XAxis, YAxis, Area } from "recharts";

type IProps = {
  caller: string;
  data?: { name: string; value: number; date: string }[];
  areaFill?: string;
  lineFill?: string;
};

const TEST_DATA: { name: string; value: number; date: string }[] = [
  { name: "Instagram", value: 500, date: "01/02/2026" },
  { name: "Instagram", value: 1500, date: "01/04/2026" },
  { name: "Instagram", value: 690, date: "01/06/2026" },
  { name: "Instagram", value: 3500, date: "01/08/2026" },
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
        <XAxis dataKey="name" className={styles.xAxis} />
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
