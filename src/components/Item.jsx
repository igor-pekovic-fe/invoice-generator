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
    <div className="flex flex-col gap-2 mb-4 bg-gray-300 p-4 rounded-md hover:ring hover:ring-gray-400 transition-all">
      <div className="flex justify-between">
        <p>
          Amount: {currency}
          {itemState.amount()}
        </p>
        <button
          className={disableDelete ? "hidden" : ""}
          onClick={handleDelete}
          disabled={disableDelete}
        >
          x
        </button>
      </div>

      <SharedInput
        type="text"
        name="description"
        placeholderText="Description of service or product..."
        value={itemState.description}
        handleChange={handleChange}
      />
      <div className="flex items-center gap-1">
        <SharedInput
          type="number"
          name="rate"
          currency={currency}
          placeholder="Rate"
          value={itemState.rate}
          handleChange={handleChange}
        />
        <p>x</p>
        <SharedInput
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={itemState.quantity}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Item;
