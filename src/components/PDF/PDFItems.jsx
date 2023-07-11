import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    color: "#000",
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

function PDFItems({ data }) {
  const itemsArr = data.items.map((item) => (
    <View style={styles.row} key={item.id}>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.qty}>{item.quantity}</Text>
      <Text style={styles.rate}>{item.rate}</Text>
      <Text style={styles.amount}>{item.amount()}</Text>
    </View>
  ));

  return <>{itemsArr}</>;
}

export default PDFItems;
