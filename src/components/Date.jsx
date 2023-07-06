import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useStore } from "../store";

function Date({ labelText, name }) {
  const setValue = useStore((state) => state.setValue);

  return (
    <div className="flex items-center gap-2 justify-end">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <label> {labelText}</label>
        <DatePicker
          className="w-44 bg-white rounded-lg p-0"
          onChange={(newDate) =>
            setValue(newDate.$d.toLocaleDateString(), name)
          }
        />
      </LocalizationProvider>
    </div>
  );
}
export default Date;
