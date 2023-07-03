import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { nanoid } from "nanoid";
import SharedInput from "./components/SharedInput";
import SharedTextArea from "./components/SharedTextArea";
import Item from "./components/Item";
import Currency from "./components/Currency";
import Total from "./components/Total";
import Date from "./components/Date";

function App() {
  const {
    number,
    from,
    billTo,
    shipTo,
    date,
    dueDate,
    notes,
    terms,
    items,
    addItem,
    deleteItem,
  } = useStore(
    (state) => ({
      number: state.number,
      from: state.from,
      billTo: state.billTo,
      shipTo: state.shipTo,
      date: state.date,
      dueDate: state.dueDate,
      notes: state.notes,
      terms: state.terms,
      items: state.items,
      addItem: state.addItem,
      deleteItem: state.deleteItem,
    }),
    shallow
  );

  const handleGenerateItem = () => {
    const newItem = {
      description: "",
      rate: 0,
      quantity: 0,
      id: nanoid(),
    };
    addItem(newItem);
  };

  const store = useStore();

  console.log(store.date, store.dueDate);

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId);
  };

  return (
    <div>
      <h1>INVOICE</h1>
      <Currency />
      <div>
        <SharedInput
          labelText={"#"}
          type="number"
          placeholderText={"Number of invoice"}
          value={number}
          name={"number"}
        />
        <SharedTextArea
          value={from}
          name="from"
          labelText="Invoice from:"
          placeholderText="Who is this invoice from?"
        />
        <SharedTextArea
          value={billTo}
          name="billTo"
          labelText="Bill to:"
          placeholderText="Who is this invoice to?"
        />
        <SharedTextArea
          value={shipTo}
          name="shipTo"
          labelText="Ship to:"
          placeholderText="Who is this invoice shipped to?"
        />
      </div>
      <div>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={handleDeleteItem}
            disableDelete={items.length === 1}
          />
        ))}
      </div>
      <button onClick={handleGenerateItem}>+ Line Item</button>
      <Date labelText="Date" name="date" />
      <Date labelText="Due Date" name="dueDate" />
      <SharedTextArea
        value={notes}
        name="notes"
        labelText="Notes"
        placeholderText="Notes - any releveant information not already covered"
      />
      <SharedTextArea
        value={terms}
        name="terms"
        labelText="Invoice from:"
        placeholderText="Terms and conditions - late fees, payment methods, delivery schedule"
      />
      <Total />
    </div>
  );
}

export default App;
