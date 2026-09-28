import {
  DatePicker as CalendarPicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type IProps = Omit<DatePickerProps, "value" | "onChange"> & {
  value: number | null;
  handleChange: (value: number | null) => void;
};

export default function DatePicker({ handleChange, value, ...props }: IProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CalendarPicker
        value={value ? dayjs.unix(value) : null}
        onChange={(value) =>
          handleChange(value?.isValid() ? value.unix() : null)
        }
        format="DD/MM/YYYY"
        {...props}
      />
    </LocalizationProvider>
  );
}
