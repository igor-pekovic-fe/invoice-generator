import { useState, useEffect } from "react";
import { useStore } from "../store";
import SharedInput from "./SharedInput";

function Item({ item, onDeleteItem, disableDelete }) {
  const { currency, updateItem } = useStore((state) => ({
    currency: state.currency,
    updateItem: state.updateItem,
  }));
  const [itemState, setItemState] = useState(() => item);

  useEffect(() => {
    setItemState(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedItem = { ...itemState, [name]: value };
    setItemState(updatedItem);
    updateItem(item.id, updatedItem);
  };

  const handleDelete = () => {
    onDeleteItem(itemState.id);
  };

  return (
    <div>
      <SharedInput
        type="text"
        name="description"
        placeholderText="Description"
        value={itemState.description}
        handleChange={handleChange}
      />
      <SharedInput
        type="number"
        name="rate"
        currency={currency}
        placeholder="Rate"
        value={itemState.rate}
        handleChange={handleChange}
      />
      <SharedInput
        type="number"
        name="quantity"
        currency={currency}
        placeholder="Quantity"
        value={itemState.quantity}
        handleChange={handleChange}
      />
      <p>
        Amount: {currency}
        {itemState.amount()}
      </p>
      <button onClick={handleDelete} disabled={disableDelete}>
        Delete
      </button>
    </div>
  );
}

export default Item;
