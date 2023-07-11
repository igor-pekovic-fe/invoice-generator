import { useStore } from "../../store";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import PDFHeader from "./PDFHeader";
import PDFInfo from "./PDFInfo";
import PDFItemsTable from "./PDFItemsTable";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
      fontWeight: 300,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
      fontWeight: 400,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
      fontWeight: 500,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
      fontWeight: 600,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
      fontWeight: 700,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
      fontWeight: 900,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: "48px",
    backgroundColor: "#fff",
  },
  text: {
    color: "#000",
    fontSize: "12px",
    fontWeight: "bold",
  },
  row2: {
    flexDirection: "row",
    color: "#000",
    backgroundColor: "#fff",
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    fontSize: "12px",
  },
});

const PDFDocument = (
  { data } //
) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PDFHeader data={data} />
      <PDFInfo data={data} />
      <PDFItemsTable data={data} />
    </Page>
  </Document>
);

export default PDFDocument;
