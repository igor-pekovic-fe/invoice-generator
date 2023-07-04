import TextareaAutosize from "react-textarea-autosize";
import { useStore } from "../store";

function SharedTextArea({ value, name, labelText, placeholderText }) {
  const setValue = useStore((state) => state.setValue);

  const handleChange = (e) => {
    setValue(e.target.value, name);
  };

  return (
    <div className="flex flex-col ">
      <label className="mb-1">{labelText}</label>
      <TextareaAutosize
        className="resize-none p-2"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        minRows="2"
        placeholder={placeholderText}
      />
    </div>
  );
}

export default SharedTextArea;
