import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
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
});

function PDFItemsHeader() {
  return (
    <View style={styles.row}>
      <Text style={styles.description}>Description</Text>
      <Text style={styles.qty}>Quantity</Text>
      <Text style={styles.rate}>Rate</Text>
      <Text style={styles.amount}>Amount</Text>
    </View>
  );
}

export default PDFItemsHeader;
