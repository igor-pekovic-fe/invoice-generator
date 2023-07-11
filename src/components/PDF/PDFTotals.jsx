import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    fontSize: "16px",
    marginTop: 20,
    flexDirection: "column",
  },
  text: {
    alignSelf: "flex-end",
  },
});

function PDFTotals({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Subtotal: {data.subTotal()}</Text>
      <Text style={styles.text}>Total: {data.balanceDue}</Text>
    </View>
  );
}

export default PDFTotals;
