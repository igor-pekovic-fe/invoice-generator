import { View, StyleSheet } from "@react-pdf/renderer";

import PDFItemsHeader from "./PDFItemsHeader";
import PDFItems from "./PDFItems";

function PDFItemsTable({ data }) {
  return (
    <View>
      <PDFItemsHeader />
      <PDFItems items={data.items} />
    </View>
  );
}

export default PDFItemsTable;
