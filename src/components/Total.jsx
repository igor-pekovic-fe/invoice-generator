import { useState, useEffect } from "react";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import {
  AiOutlineCloseCircle,
  AiOutlinePlus,
  AiOutlinePercentage,
} from "react-icons/ai";

function Total() {
  const {
    currency,
    subTotal,
    discountValue,
    taxValue,
    shipping,
    setValue,
    total,
    amountPaid,
    balanceDue,
  } = useStore(
    (state) => ({
      currency: state.currency,
      subTotal: state.subTotal(),
      discountValue: state.discountValue,
      taxValue: state.taxValue,
      shipping: state.shipping,
      total: state.total,
      amountPaid: state.amountPaid,
      balanceDue: state.balanceDue,
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
    shipping: {
      isDisplaying: false,
      type: "fixed",
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
        value: parseFloat(newValue),
      },
    }));
  };

  const handleChangeDefault = (e) => {
    setValue(e.target.value, e.target.name);
  };

  const changeType = (stateType) => {
    if (stateType === "shipping") {
      return;
    }
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
    <div className="flex flex-col py-4">
      <div className="flex gap-2">
        <label>Subtotal</label>
        {currency}
        {subTotal.toFixed(2)}
      </div>
      <div className="md:flex">
        <div className="flex items-center gap-2 h-8 ">
          {values.discount.isDisplaying && (
            <div>
              <label htmlFor="discountValue">Discount: </label>
              {values.discount.type === "percentage" ? "%" : currency}
              <input
                className="w-10 h-8 p-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
                type="number"
                value={discountValue}
                name="discount"
                id="discountValue"
                onChange={(e) => handleChange(e, "discount")}
              />
            </div>
          )}
          <button
            className="text-green-600"
            onClick={() => handleToggle("discount")}
          >
            {values.discount.isDisplaying ? (
              <AiOutlineCloseCircle className="hover:scale-110 transition-all" />
            ) : (
              "+ Discount"
            )}
          </button>
          {values.discount.isDisplaying && (
            <button onClick={() => changeType("discount")}>
              {values.discount.type === "percentage" ? (
                "..."
              ) : (
                <div>
                  <AiOutlinePercentage></AiOutlinePercentage>
                </div>
              )}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {values.tax.isDisplaying && (
            <div>
              <label htmlFor="taxValue">Tax: </label>
              {values.tax.type === "percentage" ? "%" : currency}
              <input
                className="w-10 h-8 p-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
                type="number"
                value={taxValue}
                name="discount"
                id="taxValue"
                onChange={(e) => handleChange(e, "tax")}
              />
            </div>
          )}
          <button onClick={() => handleToggle("tax")}>
            {values.tax.isDisplaying ? (
              <AiOutlineCloseCircle className="hover:scale-110 transition-all" />
            ) : (
              "+ Tax"
            )}
          </button>
          {values.tax.isDisplaying && (
            <button onClick={() => changeType("tax")}>
              {values.tax.type === "percentage" ? "Fixed" : "Percentage"}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {values.shipping.isDisplaying && (
            <div>
              <label htmlFor="shipping">Shipping: </label>
              <input
                className="w-10 h-8 p-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
                type="number"
                value={shipping}
                name="shipping"
                id="shipping"
                onChange={(e) => handleChangeDefault(e, "shipping")}
              />
            </div>
          )}
          <button onClick={() => handleToggle("shipping")}>
            {values.shipping.isDisplaying ? "x" : "+ Shipping"}
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <label>Total: </label>
        <span className="flex gap-4">
          {currency}
          {total.toFixed(2)}
        </span>
      </div>
      <div>
        <label htmlFor="amountPaid">Amount Paid: </label>
        <input
          className="w-10 h-8 p-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
          type="number"
          value={amountPaid}
          name="amountPaid"
          id="amountPaid"
          onChange={handleChangeDefault}
        />
      </div>
      <div className="flex gap-1">
        <label>Balance Due: </label>
        <span className="flex gap-4">
          {currency}
          {balanceDue.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

export default Total;
