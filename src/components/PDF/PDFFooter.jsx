import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  textArea: {
    flexDirection: "column",
  },
});

function PDFFooter({ data }) {
  return (
    <View style={styles.textArea}>
      <Text>Notes:</Text>
      <Text>{data.notes}</Text>
      <Text>Terms:</Text>
      <Text>{data.terms}</Text>
    </View>
  );
}

export default PDFFooter;
