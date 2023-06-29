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
    <Select
      options={options}
      defaultValue={selectedOption}
      onChange={setSelectedOption}
    />
  );
}

export default Currency;
