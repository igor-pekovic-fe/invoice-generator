import { useState, useEffect } from "react";
import { useStore } from "../store";
import { AiOutlineCloseCircle } from "react-icons/ai";

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
    <div className="flex flex-col gap-2 mb-4 bg-gray-300 p-4 rounded-md ">
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
          <AiOutlineCloseCircle className="hover:scale-110 transition-all" />
        </button>
      </div>
      <input
        className="h-8 p-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
        type="text"
        name="description"
        placeholder="Description of service or product..."
        value={itemState.description}
        onChange={handleChange}
      />
      <div className="flex items-center">
        <div>
          {currency}
          <input
            className="w-10 h-8 p-1 rounded-md ml-1 focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
            type="number"
            name="rate"
            placeholder="Rate"
            value={itemState.rate}
            onChange={handleChange}
          />
        </div>

        <span className="px-2">x</span>
        <input
          className="w-10 h-8 p-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={itemState.quantity}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default Item;
