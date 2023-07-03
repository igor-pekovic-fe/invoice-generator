import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useStore } from "../store";

function Date({ labelText, name, value }) {
  const setValue = useStore((state) => state.setValue);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <label> {labelText}</label>
        <DatePicker onChange={(newDate) => setValue(newDate.$d, name)} />
      </LocalizationProvider>
    </div>
  );
}
export default Date;
