import { Grid } from "@mui/material";
import styles from "./layout.module.scss"

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Grid container className={styles.layout}>
      <Grid size={{ lg: 3, }} className={styles.sidebarGrid}></Grid>
    </Grid>
  )
}