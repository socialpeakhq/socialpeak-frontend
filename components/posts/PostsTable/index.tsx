/* eslint-disable @next/next/no-img-element */
import { Box, Button } from "@mui/material";
import styles from "./styles.module.scss";
import DataGrid from "@/components/shared/DataGrid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Post } from "@/react-query/posts/posts.type";
import { useMemo } from "react";
import useWorkspaceStore from "@/stores/useWorkspaceStore";
import useDialogStore from "@/stores/useDialogStore";
import { usePostLists } from "@/react-query/posts/usePostLists";
import { formatDateTime } from "@/utils/helper.functions";
import { PLATFORM_ICON } from "@/components/posts/platformIcons";
import { MediaDialogPayload } from "@/components/posts/MediaDialog";
import { TargetsDialogPayload } from "@/components/posts/TargetsDialog";
import { useSearchParams } from "next/navigation";

export default function PostsTable() {
  const searchParams = useSearchParams();
  const selectedWorkspaceId = useWorkspaceStore(
    (s) => s.selectedWorkspace?.workspace_id,
  );
  const openDialog = useDialogStore((s) => s.openDialog);

  const { data } = usePostLists(selectedWorkspaceId, searchParams?.toString());

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
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell(params: GridRenderCellParams<Post>) {
        return (
          <span className={styles.cellType} title={params.row.caption}>
            {params.row.type}
          </span>
        );
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
        const type = params.row.type;
        if (media.length === 0) {
          return <span className={styles.cellSub}>No media</span>;
        }
        return (
          <div className={styles.cellWithStack}>
            {type === "reel" ? (
              <></>
            ) : (
              <img src={media[0]} alt="" className={styles.mediaThumb} />
            )}
            <Button
              variant="outlined"
              className={styles.viewButton}
              onClick={() =>
                openDialog<MediaDialogPayload>({
                  dialogCaller: "post-media",
                  dialogContent: { postId: params.row.id, media },
                })
              }
            >
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
            <Button
              variant="outlined"
              className={styles.viewButton}
              onClick={() =>
                openDialog<TargetsDialogPayload>({
                  dialogCaller: "post-targets",
                  dialogContent: { postId: params.row.id, targets },
                })
              }
            >
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
            type: item.type,
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
      <DataGrid columns={columns} rows={rows} pagination paginationSize={50} />
    </Box>
  );
}
