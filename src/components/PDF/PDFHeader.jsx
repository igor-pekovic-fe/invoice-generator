import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#000",
    fontSize: "14px",
    fontWeight: "bold",
  },
  title: {
    alignSelf: "flex-end",
    color: "#000",
    fontSize: "32px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "16px",
    color: "#808080",
    alignSelf: "flex-end",
  },
});

function PDFHeader({ data }) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{data.from}</Text>
      <View>
        <Text style={styles.title}>INVOICE </Text>
        <Text style={styles.subtitle}># {data.number}</Text>
      </View>
    </View>
  );
}

export default PDFHeader;
