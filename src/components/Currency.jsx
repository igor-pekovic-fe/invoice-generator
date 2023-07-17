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
    <div className="p-0 w-fit rounded-md">
      <select value={selectedOption.value} onChange={handleSelectChange}>
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
