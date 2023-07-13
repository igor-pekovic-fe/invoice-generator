import { useState, useEffect } from "react";
import { useStore } from "../store";
import Select from "react-select";

function Currency() {
  const [selectedOption, setSelectedOption] = useState({
    value: "dollar",
    label: "USD ($)",
    symbol: "$",
  });

  const setValue = useStore((state) => state.setValue);

  useEffect(() => {
    setValue(selectedOption.symbol, "currency");
  }, [selectedOption]);

  const options = [
    { value: "dollar", label: "USD ($)", symbol: "$" },
    { value: "euro", label: "EUR (€)", symbol: "€" },
    { value: "pound", label: "GBP (£)", symbol: "£" },
    { value: "convertible-mark", label: "BAM (KM)", symbol: "KM" },
    { value: "serbian-dinar", label: "RSD (Дин.)", symbol: "Дин." },
  ];

  return (
    <div className="w-fit rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all">
      <Select
        options={options}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
      />
    </div>
  );
}

export default Currency;
