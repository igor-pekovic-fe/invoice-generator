import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    fontSize: "12px",
  },
  text: {
    marginBottom: "5px",
    color: "#808080",
  },
  textArea: {
    marginBottom: "15px",
  },
});

function PDFFooter({ data }) {
  return (
    <View style={styles.container}>
      {data.notes && (
        <div>
          <Text style={styles.text}>Notes:</Text>
          <Text style={styles.textArea}>{data.notes}</Text>
        </div>
      )}
      {data.terms && (
        <div>
          <Text style={styles.text}>Terms:</Text>
          <Text style={styles.textArea}>{data.terms}</Text>
        </div>
      )}
    </View>
  );
}

export default PDFFooter;
