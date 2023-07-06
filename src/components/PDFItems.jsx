import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

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

function PDFItems({ data }) {
  const itemsArr = data.items.map((item) => {
    <View style={styles.row2}>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.qty}>{item.quantity}</Text>
      <Text style={styles.rate}>{item.rate}</Text>
      <Text style={styles.amount}>{item.amount}</Text>
    </View>;
  });

  return { itemsArr };
}

export default PDFItems;
