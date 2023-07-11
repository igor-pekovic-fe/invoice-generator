import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
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
});

function PDFInfo({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
        <Text>Bill to:</Text>
        <Text>{data.billTo}</Text>
        <Text>Ship to:</Text>
        <Text>{data.shipTo}</Text>
      </View>
      <View style={styles.dates}>
        <Text>Date: {data.date}</Text>
        <Text>Due Date: {data.dueDate}</Text>
        <Text style={styles.balance}>Balance Due: ${data.balanceDue}</Text>
      </View>
    </View>
  );
}

export default PDFInfo;
