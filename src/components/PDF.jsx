import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import PDFItems from "./PDFItems";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
      fontWeight: 100,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
      fontWeight: 200,
    },
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
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
      fontWeight: 800,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
      fontWeight: 900,
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: "48px",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#000",
    fontSize: "12px",
    fontWeight: "bold",
  },
  title: {
    alignSelf: "flex-end",
    color: "#000",
    fontSize: "32px",
    fontWeight: "bold",
  },
  container: {
    fontSize: "16px",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textArea: {
    flexDirection: "column",
  },
  dates: {
    alignSelf: "flex-end",
  },
  balance: {
    fontSize: "12px",
    fontWeight: "bold",
    backgroundColor: "#808080",
  },
  row: {
    flexDirection: "row",
    color: "#fff",
    backgroundColor: "#000",
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    fontSize: "12px",
  },
  description: {
    width: "60%",
    textAlign: "left",
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "15%",
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  rate: {
    width: "10%",
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
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

// Create Document Component
const MyDocument = (
  { data } //
) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.text}>Igor</Text>
        <Text style={styles.title}>INVOICE #1</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.textArea}>
          <Text>Bill to:</Text>
          <Text>Dragomira Malica</Text>
          <Text>Ship to:</Text>
          <Text>Dragomira Malica</Text>
        </View>
        <View style={styles.dates}>
          <Text>Date: 10.7.2023</Text>
          <Text>Due Date: 10.7.2023</Text>
          <Text style={styles.balance}>Balance Due: $222</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>Description</Text>
        <Text style={styles.qty}>Quantity</Text>
        <Text style={styles.rate}>Rate</Text>
        <Text style={styles.amount}>Amount</Text>
      </View>
      <PDFItems data={data} />
    </Page>
  </Document>
);

export default MyDocument;
