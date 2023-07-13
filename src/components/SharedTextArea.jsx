import TextareaAutosize from "react-textarea-autosize";
import { useStore } from "../store";

function SharedTextArea({ value, name, labelText, placeholderText }) {
  const setValue = useStore((state) => state.setValue);

  const handleChange = (e) => {
    setValue(e.target.value, name);
  };

  return (
    <div className="flex flex-col mb-2">
      <label className="mb-1">{labelText}</label>
      <TextareaAutosize
        className="resize-none p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
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
