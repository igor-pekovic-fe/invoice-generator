import { useStore } from "./store";
import { nanoid } from "nanoid";
import SharedInput from "./components/SharedInput";
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

  return (
    <div className="grid place-items-center bg-gray-100 p-4">
      <div className="px-6 py-8 bg-gray-200 shadow-md rounded-lg w-11/12 md:w-4/6 lg:w-5/6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl uppercase">Invoice</h1>

          <div className="flex items-center">
            <span className="flex items-center h-8 mr-1">#</span>
            <SharedInput
              type="number"
              value={invoiceData.number}
              name={"number"}
            />
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
          <SharedInput
            labelText="Date:"
            value={invoiceData.date}
            type="date"
            name="date"
          />
          <SharedInput
            labelText="Terms:"
            type="text"
            value={invoiceData.paymentTerms}
            name={"paymentTerms"}
          />
          <SharedInput
            labelText="Due Date:"
            value={invoiceData.dueDate}
            type="date"
            name="dueDate"
          />
          <SharedInput
            labelText="PO Number:"
            type="number"
            value={invoiceData.poNum}
            name={"poNum"}
          />
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
      <Currency />
      <DownloadLinks />
    </div>
  );
}

export default App;
