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
    <div className="flex items-center mb-4 gap-2">
      <label>{labelText}</label>
      <span>{currency}</span>
      <input
        className={type === "text" ? "w-full p-2 rounded-sm" : "w-12"}
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
