import React, { useState, useEffect } from "react";
import { useStore } from "../store";

function Currency() {
  const [selectedOption, setSelectedOption] = useState({
    value: "euro",
    label: "EUR (€)",
    symbol: "€",
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

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    setSelectedOption(selectedOption);
  };

  return (
    <div className="bg-white h-8 p-0 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all">
      <select
        className="bg-white rounded-md p-1 mt-1"
        value={selectedOption.value}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Currency;
