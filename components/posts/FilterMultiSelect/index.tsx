import { MenuItem, Select } from "@mui/material";
import styles from "./styles.module.scss";

type IProps = {
  options: { label: string; value: string }[];
  handleOptionChange: (value: string) => void;
  selectedOption: string;
};

export default function FilterMultiSelect({
  handleOptionChange,
  options,
  selectedOption,
}: IProps) {
  return (
    <Select
      value={selectedOption}
      onChange={(e) => handleOptionChange(e.target.value)}
      className={styles.filterSelect}
    >
      {options.map((option, index) => (
        <MenuItem
          key={index + 1}
          value={option.value}
          className={styles.option}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
