/* eslint-disable @next/next/no-img-element */
import { Box, Button } from "@mui/material";
import styles from "./styles.module.scss";
import DataGrid from "@/components/shared/DataGrid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Post } from "@/react-query/posts/posts.type";
import { useMemo } from "react";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import { usePostLists } from "@/react-query/posts/usePostLists";
import FacebookIcon from "@/assets/accounts/facebook.svg";
import InstagramIcon from "@/assets/accounts/instagram.svg";
const PLATFORM_ICON: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

function formatDateTime(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function PostsTable() {
  const selectedWorkspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );

  const { data } = usePostLists(selectedWorkspaceId);

  const columns: GridColDef<Post>[] = [
    {
      field: "id",
      headerName: "Post ID",
      flex: 1,
      renderCell(params: GridRenderCellParams<Post>) {
        return <span className={styles.cellId}>#{params.row.id}</span>;
      },
    },
    {
      field: "caption",
      headerName: "Caption",
      flex: 2,
      renderCell(params: GridRenderCellParams<Post>) {
        return (
          <span className={styles.cellCaption} title={params.row.caption}>
            {params.row.caption}
          </span>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
      renderCell(params: GridRenderCellParams<Post>) {
        return <span>{formatDateTime(params.row.created_at)}</span>;
      },
    },
    {
      field: "media_urls",
      headerName: "Media",
      flex: 1,
      renderCell(params: GridRenderCellParams<Post>) {
        const media = params.row.media_urls;
        if (media.length === 0) {
          return <span className={styles.cellSub}>No media</span>;
        }
        return (
          <div className={styles.cellWithStack}>
            <img src={media[0]} alt="" className={styles.mediaThumb} />
            <Button variant="outlined" className={styles.viewButton}>
              View ({media.length})
            </Button>
          </div>
        );
      },
    },
    {
      field: "targets",
      headerName: "Targets",
      flex: 1,
      renderCell(params: GridRenderCellParams<Post>) {
        const targets = params.row.targets;
        if (targets.length === 0) {
          return <span className={styles.cellSub}>No targets</span>;
        }
        return (
          <div className={styles.cellWithStack}>
            <div className={styles.stackIcons}>
              {targets.map((target) => {
                const Icon = PLATFORM_ICON[target.platform];
                return Icon ? (
                  <Icon key={target.id} className={styles.stackIcon} />
                ) : null;
              })}
            </div>
            <Button variant="outlined" className={styles.viewButton}>
              View
            </Button>
          </div>
        );
      },
    },
  ];

  const rows: Post[] = useMemo(
    () =>
      data
        ? data.map((item: Post) => ({
            id: item.id,
            caption: item.caption,
            created_at: item.created_at,
            media_urls: item.media_urls,
            targets: item.targets,
          }))
        : [],
    [data],
  );

  return (
    <Box className={styles.contentContainer}>
      <DataGrid columns={columns} rows={rows} pagination paginationSize={5} />
    </Box>
  );
}
