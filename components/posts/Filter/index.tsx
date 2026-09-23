import { Box, TextField } from "@mui/material";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import usePostStore from "@/stores/usePostStore";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "@/utils/utils";

export default function Filter() {
  const handleModifyFilters = usePostStore((s) => s.handleModifyFilters);
  const [searchValue, setSearchValue] = useState<string>("");

  const deboucedSearchValue = useDebounce(searchValue);

  useEffect(() => {
    handleModifyFilters("searchField", deboucedSearchValue, "text");
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
    </Box>
  );
}
