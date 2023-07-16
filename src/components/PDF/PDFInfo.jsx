import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    fontSize: "14px",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textArea: {
    flexDirection: "row",
    fontWeight: "bold",
  },
  dates: {
    alignSelf: "flex-end",
  },
  balance: {
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "#D3D3D3",
    paddingVertical: "5px",
    paddingHorizontal: "25px",
  },
  billTo: {
    fontWeight: "bold",
  },
  shipTo: {
    fontWeight: "bold",
    marginLeft: "50px",
  },
});

function formatDate(dateString) {
  const dateParts = dateString.split("-");
  const year = dateParts[0];
  const month = getMonthName(dateParts[1]);
  const day = dateParts[2];

  return `${month} ${day}, ${year}`;
}

function getMonthName(month) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = parseInt(month, 10) - 1;
  return months[monthIndex];
}

function PDFInfo({ data }) {
  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
        <View style={styles.billTo}>
          <Text>Bill to:</Text>
          <Text>{data.billTo}</Text>
        </View>
        {data.shipTo && (
          <View style={styles.shipTo}>
            <Text>Ship to:</Text>
            <Text>{data.shipTo}</Text>
          </View>
        )}
      </View>
      <View style={styles.dates}>
        <Text>Date: {formatDate(data.date)}</Text>
        <Text>Due Date: {formatDate(data.dueDate)}</Text>
        <Text style={styles.balance}>Balance Due: ${data.balanceDue}</Text>
      </View>
    </View>
  );
}

export default PDFInfo;
