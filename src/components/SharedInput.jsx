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

  const getInputClassName = () => {
    let baseClass =
      "h-8 p-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all";
    switch (type) {
      case "number":
        return `${baseClass} w-10 p-1`;
      case "text":
        return `${baseClass} w-full`;
      case "date":
        return `${baseClass} w-fit`;
      default:
        return baseClass;
    }
  };

  return (
    <div className="flex items-center">
      <label className="mr-1">{labelText}</label>
      <div>
        <span className={currency && "mr-1 font-bold"}>{currency}</span>
        <input
          className={getInputClassName()}
          type={type}
          placeholder={placeholderText}
          value={value}
          id={name}
          onChange={handleChange || handleChangeDefault}
          name={name}
          min={value}
        />
      </div>
    </div>
  );
}

export default SharedInput;
