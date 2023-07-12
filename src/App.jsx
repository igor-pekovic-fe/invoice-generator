import { useStore } from "./store";
import { nanoid } from "nanoid";
import SharedInput from "./components/SharedInput";
import SharedTextArea from "./components/SharedTextArea";
import Item from "./components/Item";
import Currency from "./components/Currency";
import Total from "./components/Total";
import PDFDocument from "./components/PDF/PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

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
    <div className="grid h-screen place-items-center">
      <div className="px-6 py-8 bg-slate-200 rounded-lg">
        <h1 className="text-3xl mb-2">INVOICE</h1>
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex">
            <span className="p-2 flex place-items-center bg-gray-300 w-6 h-6">
              #
            </span>
            <SharedInput
              type="number"
              placeholderText={"Number of invoice"}
              value={invoiceData.number}
              name={"number"}
            />
          </div>
          <SharedTextArea
            value={invoiceData.from}
            name="from"
            labelText="Invoice from:"
            placeholderText="Who is this invoice from?"
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
        <div className="flex flex-col gap-2 mb-8">
          <SharedInput
            labelText="Date:"
            value={invoiceData.date}
            type="date"
            name="date"
          />
          <SharedInput
            labelText={"Payment Terms"}
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
            labelText={"PO Number"}
            type="number"
            value={invoiceData.poNum}
            name={"poNum"}
          />
        </div>

        <div>
          {invoiceData.items.map((item) => (
            <Item
              key={item.id}
              item={item}
              onDeleteItem={handleDeleteItem}
              disableDelete={invoiceData.items.length === 1}
            />
          ))}
          <button
            className="bg-green-600 text-white p-2 rounded-md mt-2"
            onClick={handleGenerateItem}
          >
            + Line Item
          </button>
        </div>
        <SharedTextArea
          value={invoiceData.notes}
          name="notes"
          labelText="Notes"
          placeholderText="Notes - any releveant information not already covered"
        />
        <SharedTextArea
          value={invoiceData.terms}
          name="terms"
          labelText="Invoice from:"
          placeholderText="Terms and conditions - late fees, payment methods, delivery schedule"
        />
        <Total />
      </div>
      <Currency />
      <PDFDownloadLink
        document={<PDFDocument data={invoiceData} />}
        fileName={`Invoice #${invoiceData.number}`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );
}

export default App;
