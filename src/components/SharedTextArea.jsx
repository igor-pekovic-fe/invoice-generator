import TextareaAutosize from "react-textarea-autosize";
import { useStore } from "../store";

function SharedTextArea({ value, name, labelText, placeholderText }) {
  const setValue = useStore((state) => state.setValue);

  const handleChange = (e) => {
    setValue(e.target.value, name);
  };

  return (
    <div>
      <label>{labelText}</label>
      <TextareaAutosize
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
