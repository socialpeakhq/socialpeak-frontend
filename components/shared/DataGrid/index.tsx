/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, type ReactElement } from "react";
import styles from "./styles.module.scss";
import {
  DataGrid as MuiDataGrid,
  type GridRowsProp,
  type GridColDef,
} from "@mui/x-data-grid";

type IProps = {
  columns: readonly GridColDef<any>[];
  rows: GridRowsProp;
  autoRowHeight?: boolean;
  pagination: boolean;
  paginationSize?: number;
  loading?: boolean;
};

export default function DataGrid({
  columns,
  rows,
  autoRowHeight = false,
  pagination = true,
  paginationSize = 20,
  loading = false,
}: IProps): ReactElement {
  const pageSize = pagination ? paginationSize : Math.max(rows.length, 1);

  const sx = useMemo(
    () => ({
      width: "100%",
      height: "100%",
      minWidth: 0,
      minHeight: 0,
      fontFamily: "inherit",
      border: "1px solid rgb(238, 238, 238)",
      borderRadius: "16px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 10px rgba(15, 23, 42, 0.05)",
      "& .MuiDataGrid-main": {
        borderRadius: "16px",
      },
      "& .MuiDataGrid-cell": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        backgroundColor: "#fff",
        color: "var(--text-color)",
        fontSize: "13px",
        borderTop: "none",
        borderBottom: "solid 1px rgb(238, 238, 238)",
        display: "flex",
        alignItems: "center",
        minHeight: "52px",
      },
      "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
        outline: "none",
      },
      "& .MuiDataGrid-virtualScrollerRenderZone .MuiDataGrid-row:last-of-type .MuiDataGrid-cell":
        {
          borderBottom: "none",
        },
      "& .MuiDataGrid-row:hover .MuiDataGrid-cell": {
        backgroundColor: "var(--sidebar-background-color)",
      },
      "& .MuiDataGrid-filler": {
        backgroundColor: "#fff !important",
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "var(--sidebar-background-color)",
      },
      "& .MuiDataGrid-columnHeader": {
        backgroundColor: "var(--sidebar-background-color)",
        color: "var(--transparent-text-color)",
      },
      "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
        outline: "none",
      },
      "& .MuiDataGrid-columnHeaderTitle": {
        fontSize: "11px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      },
      "& .MuiDataGrid-columnHeader--sorted .MuiDataGrid-columnHeaderTitle": {
        color: "var(--accent-purple)",
      },
      "& .MuiDataGrid-sortButton": {
        backgroundColor: "transparent !important",
        color: "var(--transparent-text-color) !important",
      },
      "& .MuiDataGrid-columnHeader--sorted .MuiDataGrid-sortButton": {
        color: "var(--accent-purple) !important",
      },
      "& .MuiDataGrid-columnSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-withBorderColor": {
        borderColor: "rgb(238, 238, 238)",
      },
      "& .MuiDataGrid-menuIcon svg": {
        color: "var(--transparent-text-color) !important",
      },
      "& .MuiDataGrid-cell[data-field='screenshot']": {
        alignItems: "flex-start",
        overflow: autoRowHeight ? "visible" : "hidden",
        py: autoRowHeight ? 1 : 0,
      },
      "& .MuiDataGrid-footerContainer": {
        backgroundColor: "var(--sidebar-background-color)",
        minHeight: "48px",
      },
      "& .MuiTablePagination-root": {
        color: "var(--transparent-text-color)",
        fontSize: "12px",
      },
      "& .MuiTablePagination-selectLabel, & .MuiTablePagination-select, & .MuiTablePagination-input":
        {
          display: "none",
        },
      "& .MuiTablePagination-actions button": {
        border: "1px solid rgb(238, 238, 238)",
        borderRadius: "8px",
        marginLeft: "6px",
      },
      "& .MuiTablePagination-actions button:not(.Mui-disabled):hover": {
        borderColor: "var(--accent-purple)",
        color: "var(--accent-purple)",
        backgroundColor: "transparent",
      },
      "& .MuiTablePagination-actions button.Mui-disabled": {
        opacity: 0.4,
      },
      "& .MuiDataGrid-overlay": {
        backgroundColor: "#fff",
        color: "var(--transparent-text-color)",
        fontSize: "13px",
      },
    }),
    [autoRowHeight],
  );

  return (
    <MuiDataGrid
      columns={columns}
      rows={rows}
      loading={loading}
      disableColumnMenu
      getRowHeight={autoRowHeight ? () => "auto" : undefined}
      getEstimatedRowHeight={autoRowHeight ? () => 240 : undefined}
      initialState={
        pagination
          ? {
              pagination: {
                paginationModel: {
                  pageSize,
                },
              },
            }
          : undefined
      }
      paginationModel={
        pagination
          ? undefined
          : {
              page: 0,
              pageSize,
            }
      }
      hideFooter={!pagination}
      pageSizeOptions={[pageSize]}
      slotProps={
        pagination
          ? {
              pagination: {
                labelDisplayedRows: ({
                  from,
                  to,
                  count,
                }: {
                  from: number;
                  to: number;
                  count: number;
                }) => `Showing ${from}–${to} of ${count}`,
              },
            }
          : undefined
      }
      className={styles.dataGrid}
      sx={sx}
    />
  );
}
