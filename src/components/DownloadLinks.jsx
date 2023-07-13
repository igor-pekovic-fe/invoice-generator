import PDFDocument from "./PDF/PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

function DownloadLinks({ invoiceData }) {
  return (
    <div className="flex flex-col gap-2 m-6">
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(invoiceData, null, "\t")
        )}`}
        download={`Invoice #${invoiceData.number}.json`}
        className="bg-orange-600 text-white font-bold p-2 rounded-md hover:ring hover:ring-orange-800 transition-all"
      >
        {`Download JSON`}
      </a>
      <PDFDownloadLink
        document={<PDFDocument data={invoiceData} />}
        fileName={`Invoice #${invoiceData.number}`}
        className="bg-green-600 text-white font-bold p-2 rounded-md hover:ring hover:ring-green-800 transition-all"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>
    </div>
  );
}

export default DownloadLinks;
