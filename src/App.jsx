import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { nanoid } from "nanoid";
import SharedInput from "./components/SharedInput";
import SharedTextArea from "./components/SharedTextArea";
import Item from "./components/Item";
import Currency from "./components/Currency";
import Total from "./components/Total";
import PDFDocument from "./components/PDF/PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

function App() {
  const {
    number,
    from,
    billTo,
    shipTo,
    paymentTerms,
    poNum,
    notes,
    terms,
    date,
    dueDate,
    balanceDue,
    items,
    addItem,
    deleteItem,
    subTotal,
    setValue,
  } = useStore(
    (state) => ({
      number: state.number,
      from: state.from,
      billTo: state.billTo,
      shipTo: state.shipTo,
      paymentTerms: state.paymentTerms,
      poNum: state.poNum,
      notes: state.notes,
      terms: state.terms,
      date: state.date,
      dueDate: state.dueDate,
      balanceDue: state.balanceDue,
      items: state.items,
      addItem: state.addItem,
      deleteItem: state.deleteItem,
      subTotal: state.subTotal,
      setValue: state.setValue,
    }),
    shallow
  );

  console.log(date, dueDate);

  const handleGenerateItem = () => {
    const newItem = {
      description: "",
      rate: 0,
      quantity: 0,
      id: nanoid(),
    };
    addItem(newItem);
  };

  console.log(items);

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId);
  };

  const pdfData = {
    from: from,
    billTo: billTo,
    shipTo: shipTo,
    number: number,
    date: date,
    dueDate: dueDate,
    balanceDue: balanceDue,
    subTotal: subTotal,
    notes: notes,
    terms: terms,
    items: items,
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className="px-6 py-8 bg-slate-200 rounded-lg">
        <h1 className="text-3xl mb-2">INVOICE</h1>
        <Currency />
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex">
            <span className="p-2 flex place-items-center bg-gray-300 w-6 h-6">
              #
            </span>
            <SharedInput
              type="number"
              placeholderText={"Number of invoice"}
              value={number}
              name={"number"}
            />
          </div>
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
        <div className="flex flex-col gap-2 mb-8">
          <input
            className="w-44"
            value={date}
            type="date"
            onChange={(e) => setValue(e.target.value, "date")}
          />
          <SharedInput
            labelText={"Payment Terms"}
            type="text"
            value={paymentTerms}
            name={"paymentTerms"}
          />
          <input
            className="w-44"
            value={dueDate}
            type="date"
            onChange={(e) => setValue(e.target.value, "dueDate")}
          />
          <SharedInput
            labelText={"PO Number"}
            type="number"
            value={poNum}
            name={"poNum"}
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
          <button
            className="bg-green-600 text-white p-2 rounded-md mt-2"
            onClick={handleGenerateItem}
          >
            + Line Item
          </button>
        </div>
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
      <PDFDownloadLink
        document={<PDFDocument data={pdfData} />}
        fileName={`Invoice #${number}`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );
}

export default App;
