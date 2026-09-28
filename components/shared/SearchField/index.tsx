import { OutlinedTextFieldProps, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type IProps = Omit<OutlinedTextFieldProps, "value" | "onChange" | "variant"> & {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export default function SearchField({
  searchValue,
  setSearchValue,
  placeholder,
  slotProps,
  ...rest
}: IProps) {
  return (
    <TextField
      size="small"
      {...rest}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      variant="outlined"
      placeholder={placeholder ?? "Search"}
      slotProps={{
        ...slotProps,
        input: {
          startAdornment: <SearchIcon />,
          ...slotProps?.input,
        },
      }}
    />
  );
}
