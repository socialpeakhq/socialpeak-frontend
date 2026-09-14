import { Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import { useQuery, skipToken } from "@tanstack/react-query";
import Link from "next/link";
import {
  MetaAccountsData,
  MetaAccountsDataType,
} from "@/react-query/connections/connections.type";
import { META_ACCOUNTS_QUERY_KEY } from "@/lib/metaAccountsQueryPersistence";
import { MAIN_PLATFORMS } from "../constants";

export default function ConnectedAccountsView() {
  const { data: metaAccounts } = useQuery<MetaAccountsData>({
    queryKey: META_ACCOUNTS_QUERY_KEY,
    queryFn: skipToken,
  });

  return (
    <Box className={styles.connectedAccountsView}>
      <Box className={styles.titleContainer}>
        <Typography className={styles.titleLabel}>
          Connected Accounts
        </Typography>
        <Link href={"/app/connected-accounts"}>
          <Typography className={styles.linkLabel}>Manage</Typography>
        </Link>
      </Box>
      <Box className={styles.accounts}>
        {metaAccounts &&
          Object.keys(metaAccounts).map((key) => {
            const platform = MAIN_PLATFORMS.find(
              (item) => item.platform === key,
            );
            const group = (
              metaAccounts as Record<
                string,
                Record<number, MetaAccountsDataType>
              >
            )[key];
            const data = group && Object.values(group)[0];
            return (
              <Box key={key} className={styles.platform}>
                <Box className={styles.iconContainer}>{platform?.icon}</Box>
                <Box className={styles.labelsContainer}>
                  <Typography className={styles.platformLabel}>
                    {platform?.label}
                  </Typography>
                  <Typography className={styles.accountLabel}>
                    {data.label}
                  </Typography>
                </Box>
              </Box>
            );
          })}
      </Box>
      <Box className={styles.addAccount}>
        <Typography className={styles.addAccountLabel}>
          <span>+</span>&nbsp;Connect Another Account
        </Typography>
      </Box>
    </Box>
  );
}
