import { Box, Button, TextField } from "@mui/material";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import usePostStore from "@/stores/usePostStore";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "@/utils/utils";
import FilterMultiSelect from "../FilterMultiSelect";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyTwoTone } from "@mui/icons-material";

const POST_TYPE_OPTIONS = [
  { label: "All Types", value: "all" },
  { label: "Post", value: "post" },
  { label: "Video/Reel", value: "reel" },
  { label: "Story", value: "story" },
];

const POST_PLATFORMS_OPTIONS = [
  { label: "All Platforms", value: "all" },
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
];

const POST_STATUS_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Published", value: "published" },
  { label: "Failed", value: "failed" },
];

const POST_DATE_OPTIONS = [
  { label: "All time", value: "all" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 90 Days", value: "90d" },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const filters = usePostStore((s) => s.filters);
  const handleModifyFilters = usePostStore((s) => s.handleModifyFilters);
  const [searchValue, setSearchValue] = useState<string>("");

  const deboucedSearchValue = useDebounce(searchValue);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams ?? undefined);

    Object.keys(filters).map((key: string) => {
      params.set(key, filters[key as keyof typeof filters]);
    });

    router.push(`${pathName}?${params.toString()}`);
  };

  useEffect(() => {
    handleModifyFilters("searchField", deboucedSearchValue);
  }, [deboucedSearchValue, handleModifyFilters]);

  return (
    <Box className={styles.filterContainer}>
      <TextField
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        size="small"
        variant="outlined"
        placeholder="Search by caption or ID"
        slotProps={{
          input: {
            startAdornment: <SearchIcon />,
          },
        }}
        className={styles.searchField}
      />
      <FilterMultiSelect
        options={POST_TYPE_OPTIONS}
        selectedOption={filters.types}
        handleOptionChange={(value) => handleModifyFilters("types", value)}
      />
      <FilterMultiSelect
        options={POST_PLATFORMS_OPTIONS}
        selectedOption={filters.platforms}
        handleOptionChange={(value) => handleModifyFilters("platforms", value)}
      />
      <FilterMultiSelect
        options={POST_STATUS_OPTIONS}
        selectedOption={filters.statuses}
        handleOptionChange={(value) => handleModifyFilters("statuses", value)}
      />
      <FilterMultiSelect
        options={POST_DATE_OPTIONS}
        selectedOption={filters.date}
        handleOptionChange={(value) =>
          handleModifyFilters("date", value as typeof filters.date)
        }
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        className={styles.searchButton}
      >
        Search
      </Button>
    </Box>
  );
}
