import { useStore } from "./store";
import { nanoid } from "nanoid";
import SharedTextArea from "./components/SharedTextArea";
import Item from "./components/Item";
import Currency from "./components/Currency";
import Total from "./components/Total";
import DownloadLinks from "./components/DownloadLinks";
import Divider from "./components/Divider";

function App() {
  const invoiceData = useStore();

  console.log(invoiceData);

  const handleGenerateItem = () => {
    const newItem = {
      description: "",
      rate: 0,
      quantity: 0,
      id: nanoid(),
    };
    invoiceData.addItem(newItem);
  };

  const handleDeleteItem = (itemId) => {
    invoiceData.deleteItem(itemId);
  };

  const handleChange = (e) => {
    invoiceData.setValue(e.target.value, e.target.name);
  };

  return (
    <div className="grid place-items-center bg-gray-100 p-4">
      <div className="px-6 py-8 bg-gray-200 shadow-md rounded-lg w-11/12 md:w-4/6 lg:w-5/6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl uppercase">Invoice</h1>
          <div className="flex items-center gap-2">
            <label htmlFor="number" className="flex items-center h-8 mr-1">
              #
            </label>
            <input
              className="w-10 h-8 p-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
              type="number"
              value={invoiceData.number}
              id="number"
              name="number"
              onChange={handleChange}
            />
            <Currency />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <SharedTextArea
            value={invoiceData.from}
            name="from"
            labelText="From:"
            placeholderText="Who is this invoice from?"
            required={true}
          />
          <SharedTextArea
            value={invoiceData.billTo}
            name="billTo"
            labelText="Bill to:"
            placeholderText="Who is this invoice to?"
          />
          <SharedTextArea
            value={invoiceData.shipTo}
            name="shipTo"
            labelText="Ship to:"
            placeholderText="Who is this invoice shipped to?"
          />
        </div>
        <Divider mb="6" />
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center self-end gap-2">
            <label htmlFor="date">Date: </label>
            <input
              className="w-48 h-8 p-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
              type="date"
              value={invoiceData.date}
              min={invoiceData.date}
              id="date"
              name="date"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center self-end gap-2">
            <label htmlFor="terms">Terms: </label>
            <input
              className="w-48 h-8 p-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
              type="text"
              value={invoiceData.terms}
              id="terms"
              name="terms"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center self-end gap-2">
            <label htmlFor="dueDate">Due Date: </label>
            <input
              className="w-48 h-8 p-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
              type="date"
              value={invoiceData.dueDate}
              min={invoiceData.dueDate}
              id="dueDate"
              name="dueDate"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center self-end gap-2">
            <label htmlFor="poNum">PO Number: </label>
            <input
              className="w-48 h-8 p-1 rounded-md focus:outline-none focus:ring focus:ring-gray-400 hover:ring hover:ring-gray-400 transition-all"
              type="text"
              value={invoiceData.poNum}
              id="poNum"
              name="poNum"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-6">
          {invoiceData.items.map((item) => (
            <Item
              key={item.id}
              item={item}
              onDeleteItem={handleDeleteItem}
              disableDelete={invoiceData.items.length === 1}
            />
          ))}
          <button
            className="bg-green-600 text-white font-bold p-2 rounded-md mt-2 hover:ring hover:ring-green-800 transition-all"
            onClick={handleGenerateItem}
          >
            + Line Item
          </button>
        </div>
        <Divider mb="4" />
        <div className="mb-6">
          <SharedTextArea
            value={invoiceData.notes}
            name="notes"
            labelText="Notes:"
            placeholderText="Notes - any releveant information not already covered"
          />
          <SharedTextArea
            value={invoiceData.terms}
            name="terms"
            labelText="Terms:"
            placeholderText="Terms and conditions - late fees, payment methods, delivery schedule"
          />
        </div>
        <Divider />
        <Total />
      </div>
      <DownloadLinks />
    </div>
  );
}

export default App;
