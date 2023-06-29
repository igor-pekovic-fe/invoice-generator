import { useStore } from "../store";
import { shallow } from "zustand/shallow";
import SharedInput from "./SharedInput";

function Total() {
  const { currency, subTotal, discount, tax, shipping, setValue, total } =
    useStore(
      (state) => ({
        currency: state.currency,
        subTotal: state.subTotal,
        discount: state.discount,
        tax: state.tax,
        shipping: state.shipping,
        total: state.total,
        setValue: state.setValue,
      }),
      shallow
    );

  const handleChange = (e) => {
    setValue(e.target.value, name);
  };

  console.log(subTotal);

  return (
    <div>
      <div>
        <label>Subtotal</label>
        {subTotal}
      </div>
      <div>
        <SharedInput
          labelText="Discount"
          type="number"
          value={discount}
          name="discount"
        />
      </div>
      <div>
        <SharedInput labelText="Tax" type="number" value={tax} name="tax" />
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
