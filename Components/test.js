import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Feedback = () => {
  const currentDate = new Date();
  const maindata = [];

  // Create data for all 24 hours
  for (let hour = 0; hour < 25; hour++) {
    maindata.push({
      date: currentDate.toLocaleDateString(),
      hora: hour,
      heart_circle: 'transparent',
      evento: '',
    });
  }

  // Create a table data array including the headers and all rows from maindata

  const data = [
    { column1: 'Date', column2: 'Time', column3: 'Circle Color', column4: 'evento' },
    ...maindata.map(item => ({
      column1: item.date,
      column2: item.hora.toString(),
      column3: item.heart_circle,
      column4: item.evento,
    })),
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.table}>
        {data.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Object.values(row).map((cell, cellIndex) => (
              <Text key={cellIndex} style={styles.cell}>
                {cell}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  table: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Feedback;
