import { Box, Tooltip, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useDialogStore from "@/stores/useDialogStore";
import DataGrid from "@/components/shared/DataGrid";
import { PostTarget } from "@/react-query/posts/posts.type";
import { formatDateTime } from "@/utils/helper.functions";
import { PLATFORM_ICON, PLATFORM_NAME } from "@/components/posts/platformIcons";
import styles from "./styles.module.scss";

export type TargetsDialogPayload = {
  postId: number;
  targets: PostTarget[];
};

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  failed: "Failed",
  processing: "Processing",
  published: "Published",
};

function useTargetsDialogContent(): TargetsDialogPayload | undefined {
  return useDialogStore((s) => s.dialogContent) as
    | TargetsDialogPayload
    | undefined;
}

function StatusBadge({
  status,
  errorMessage,
}: {
  status: string;
  errorMessage: string | null;
}) {
  const badge = (
    <span className={`${styles.badge} ${styles[status] ?? ""}`}>
      <span className={styles.dot} />
      {STATUS_LABEL[status] ?? status}
    </span>
  );

  if (status === "failed" && errorMessage) {
    return (
      <Tooltip title={errorMessage} arrow placement="top">
        {badge}
      </Tooltip>
    );
  }

  return badge;
}

export function TargetsDialogHeader() {
  const content = useTargetsDialogContent();

  return (
    <Box className={styles.headerContainer}>
      <Typography className={styles.titleLabel}>
        Targets for #{content?.postId}
      </Typography>
      <Typography className={styles.subtitleLabel}>
        Where this post was published
      </Typography>
    </Box>
  );
}

export function TargetsDialogContent() {
  const content = useTargetsDialogContent();
  const targets = content?.targets ?? [];

  const columns: GridColDef<PostTarget>[] = [
    {
      field: "platform",
      headerName: "Platform",
      flex: 1,
      renderCell(params: GridRenderCellParams<PostTarget>) {
        const Icon = PLATFORM_ICON[params.row.platform];
        return (
          <Box className={styles.platformCell}>
            {Icon ? <Icon className={styles.platformIcon} /> : null}
            <span>
              {PLATFORM_NAME[params.row.platform] ?? params.row.platform}
            </span>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell(params: GridRenderCellParams<PostTarget>) {
        return (
          <StatusBadge
            status={params.row.status}
            errorMessage={params.row.error_message}
          />
        );
      },
    },
    {
      field: "published_at",
      headerName: "Published At",
      flex: 1,
      renderCell(params: GridRenderCellParams<PostTarget>) {
        return <span>{formatDateTime(params.row.published_at)}</span>;
      },
    },
  ];

  if (targets.length === 0) {
    return (
      <Typography className={styles.emptyLabel}>
        No targets for this post
      </Typography>
    );
  }

  return (
    <Box className={styles.gridContainer}>
      <DataGrid columns={columns} rows={targets} pagination={false} />
    </Box>
  );
}
