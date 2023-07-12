import PDFDocument from "./PDF/PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

function DownloadLinks({ invoiceData }) {
  return (
    <div className="flex flex-col gap-2">
      <a
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(invoiceData, null, "\t")
        )}`}
        download={`Invoice #${invoiceData.number}.json`}
      >
        {`Download JSON`}
      </a>
      <PDFDownloadLink
        document={<PDFDocument data={invoiceData} />}
        fileName={`Invoice #${invoiceData.number}`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>
    </div>
  );
}

export default DownloadLinks;
