import { useState, useEffect } from "react";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import SharedInput from "./SharedInput";

function Total() {
  const {
    currency,
    subTotal,
    discountValue,
    taxValue,
    shipping,
    setValue,
    total,
  } = useStore(
    (state) => ({
      currency: state.currency,
      subTotal: state.subTotal(),
      discountValue: state.discountValue,
      taxValue: state.taxValue,
      shipping: state.shipping,
      total: state.total,
      setValue: state.setValue,
    }),
    shallow
  );

  const [values, setValues] = useState({
    discount: {
      isDisplaying: false,
      type: "percentage",
      value: 0,
    },
    tax: {
      isDisplaying: false,
      type: "percentage",
      value: 0,
    },
  });

  const [isDiscountAdded, setIsDiscountAdded] = useState(false);
  const [isTaxAdded, setIsTaxAdded] = useState(false);

  useEffect(() => {
    const { discount, tax } = values;

    setValue(
      isDiscountAdded
        ? discount.type === "percentage"
          ? "percentage"
          : "fixed"
        : "fixed",
      "discountType"
    );
    setValue(
      isDiscountAdded
        ? discount.type === "percentage"
          ? discount.value
          : discount.value
        : 0,
      "discountValue"
    );

    setValue(
      isTaxAdded
        ? tax.type === "percentage"
          ? "percentage"
          : "fixed"
        : "fixed",
      "taxType"
    );
    setValue(
      isTaxAdded ? (tax.type === "percentage" ? tax.value : tax.value) : 0,
      "taxValue"
    );
  }, [values, isDiscountAdded, isTaxAdded]);

  const handleToggle = (stateType) => {
    setValues((prevState) => ({
      ...prevState,
      [stateType]: {
        ...prevState[stateType],
        isDisplaying: !prevState[stateType].isDisplaying,
      },
    }));

    if (stateType === "discount") {
      setIsDiscountAdded((prevState) => !prevState);
    } else if (stateType === "tax") {
      setIsTaxAdded((prevState) => !prevState);
    }
  };

  const handleChange = (e, stateType) => {
    const newValue = e.target.value;
    setValues((prevState) => ({
      ...prevState,
      [stateType]: {
        ...prevState[stateType],
        value: parseFloat(newValue), // Parse the value to a float
      },
    }));
  };

  const changeType = (stateType) => {
    setValues((prevState) => ({
      ...prevState,
      [stateType]: {
        ...prevState[stateType],
        type:
          prevState[stateType].type === "percentage" ? "fixed" : "percentage",
      },
    }));
  };

  return (
    <div>
      <div>
        <label>Subtotal</label>
        {subTotal}
      </div>
      <div>
        {values.discount.isDisplaying && (
          <SharedInput
            labelText="Discount"
            type="number"
            value={discountValue}
            name="discount"
            handleChange={(e) => handleChange(e, "discount")}
          />
        )}
        <button onClick={() => handleToggle("discount")}>
          {values.discount.isDisplaying ? "Remove discount" : "Add discount"}
        </button>
        <button onClick={() => changeType("discount")}>
          {values.discount.type === "percentage" ? "Fixed" : "Percentage"}
        </button>
      </div>
      <div>
        {values.tax.isDisplaying && (
          <SharedInput
            labelText="Tax"
            type="number"
            value={taxValue}
            name="tax"
            handleChange={(e) => handleChange(e, "tax")}
          />
        )}
        <button onClick={() => handleToggle("tax")}>
          {values.tax.isDisplaying ? "Remove tax" : "Add tax"}
        </button>
        <button onClick={() => changeType("tax")}>
          {values.tax.type === "percentage" ? "Fixed" : "Percentage"}
        </button>
      </div>
      <div>
        <SharedInput
          labelText="Shipping"
          type="number"
          value={shipping}
          name="shipping"
        />
      </div>
      <div>
        <label>Total</label>
        {total}
      </div>
    </div>
  );
}

export default Total;
