import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
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
});

function PDFHeader({ data }) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{data.from}</Text>
      <Text style={styles.title}>INVOICE #{data.number}</Text>
    </View>
  );
}

export default PDFHeader;
