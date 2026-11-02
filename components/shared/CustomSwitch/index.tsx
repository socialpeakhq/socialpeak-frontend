import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.module.scss";

export type SwitchValue = string | number | boolean;

export type SwitchOption<T extends SwitchValue = SwitchValue> = {
  label: string;
  value: T;
  disabled?: boolean;
};

export type SwitchProps<T extends SwitchValue> = {
  options: SwitchOption<T>[];
  selectedValue: T;
  handleChange: (value: T) => void;
  label?: string;
};

export default function CustomSwitch<T extends SwitchValue>({
  options,
  selectedValue,
  handleChange,
  label,
}: SwitchProps<T>) {
  return (
    <Box className={styles.switchWrapper}>
      {label && <Typography className={styles.label}>{label}</Typography>}
      <Box className={styles.switchContainer} role="group" aria-label={label}>
        {options.map((option) => {
          const isSelected = option.value === selectedValue;

          return (
            <Button
              key={String(option.value)}
              onClick={() => !option.disabled && handleChange(option.value)}
              disabled={option.disabled}
              aria-pressed={isSelected}
              className={`${styles.singleItem} ${isSelected ? styles.selectedItem : ""}`}
            >
              {option.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
