import PDFDocument from "./PDF/PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useStore } from "../store";

function DownloadLinks() {
  const invoiceData = useStore();
  const isInvoiceValid = invoiceData.isInvoiceValid();

  const handleDownloadJson = () => {
    if (isInvoiceValid) {
      const jsonContent = JSON.stringify(invoiceData, null, "\t");
      const jsonBlob = new Blob([jsonContent], { type: "application/json" });
      const jsonUrl = URL.createObjectURL(jsonBlob);
      const link = document.createElement("a");
      link.href = jsonUrl;
      link.download = `Invoice #${invoiceData.number}.json`;
      link.click();
    }
  };

  return (
    <div className="flex flex-col gap-2 m-6">
      <button
        className={`bg-orange-600 text-white font-bold p-2 rounded-md hover:ring hover:ring-orange-800 transition-all ${
          isInvoiceValid ? "" : "cursor-not-allowed opacity-50"
        }`}
        onClick={handleDownloadJson}
        disabled={!isInvoiceValid}
      >
        Download JSON
      </button>
      {isInvoiceValid ? (
        <PDFDownloadLink
          document={<PDFDocument data={invoiceData} />}
          fileName={`Invoice #${invoiceData.number}`}
          className="bg-green-600 text-white font-bold p-2 rounded-md hover:ring hover:ring-green-800 transition-all"
          disabled={!isInvoiceValid}
        >
          {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
        </PDFDownloadLink>
      ) : (
        <button
          className="bg-green-600 text-white font-bold p-2 rounded-md hover:ring hover:ring-green-800 transition-all cursor-not-allowed opacity-50"
          disabled={!isInvoiceValid}
        >
          Download PDF
        </button>
      )}
    </div>
  );
}

export default DownloadLinks;
