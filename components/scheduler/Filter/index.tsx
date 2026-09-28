"use client";

import { useState } from "react";
import { Box, Button } from "@mui/material";
import styles from "./styles.module.scss";
import SearchField from "@/components/shared/SearchField";
import DatePicker from "@/components/shared/DatePicker";
import dayjs from "dayjs";

type DateFilters = {
  start_date: number | null;
  end_date: number | null;
};

export default function Filter() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [dateFilters, setDateFilters] = useState<DateFilters>({
    start_date: null,
    end_date: null,
  });

  const handleStartDateFilterChanges = (value: number | null) => {
    setDateFilters({
      ...dateFilters,
      start_date: value,
    });
  };

  const handleEndDateFilterChanges = (value: number | null) => {
    setDateFilters({
      ...dateFilters,
      end_date: value,
    });
  };

  return (
    <Box className={styles.filterContainer}>
      <SearchField
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        placeholder="Filter by caption..."
        className={styles.searchField}
      />
      <DatePicker
        value={dateFilters.start_date}
        handleChange={handleStartDateFilterChanges}
        className={styles.datePicker}
      />
      <DatePicker
        value={dateFilters.end_date}
        handleChange={handleEndDateFilterChanges}
        className={styles.datePicker}
        minDate={
          dateFilters.start_date
            ? dayjs.unix(dateFilters.start_date)
            : undefined
        }
      />
      <Button variant="contained" className={styles.searchButton}>
        Search
      </Button>
    </Box>
  );
}
