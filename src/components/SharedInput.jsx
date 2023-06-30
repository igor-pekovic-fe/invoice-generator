import { useStore } from "../store";

function SharedInput({
  type,
  labelText,
  name,
  placeholderText,
  value,
  currency,
  handleChange,
}) {
  const setValue = useStore((state) => state.setValue);

  const handleChangeDefault = (e) => {
    setValue(e.target.value, name);
  };

  return (
    <div>
      <label>{labelText}</label>
      <span>{currency}</span>
      <input
        type={type}
        placeholder={placeholderText}
        value={value}
        id={name}
        onChange={handleChange || handleChangeDefault}
        name={name}
      />
    </div>
  );
}

export default SharedInput;
