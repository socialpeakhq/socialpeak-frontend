import { Box, Grid } from "@mui/material";
import styles from "./layout.module.scss"
import Sidebar from "@/components/shared/Sidebar";

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Grid container className={styles.layout}>
      <Grid size={{ lg: 1.5, }} className={styles.sidebarGrid}>
        <Sidebar />
      </Grid>
      <Grid size={{ lg: 10.5 }} className={styles.contentGrid}>
        <Box className={styles.headerContainer}></Box>
        <Box className={styles.content}>{children}</Box>
      </Grid>
    </Grid>
  )
}