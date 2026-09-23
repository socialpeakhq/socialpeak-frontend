import { MenuItem, Select } from "@mui/material";
import styles from "./styles.module.scss";

type IProps = {
  options: { label: string; value: string }[];
  handleOptionChange: (value: string) => void;
  selectedOption: string[];
};

export default function FilterMultiSelect({
  handleOptionChange,
  options,
  selectedOption,
}: IProps) {
  const fullLabel = `${selectedOption.forEach((item) => item + ",")}`;
  return (
    <Select
      value={selectedOption.length === 1 ? selectedOption[0] : fullLabel}
      onChange={(e) => handleOptionChange(e.target.value)}
      multiple
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
