import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Feedback = () => {
  const [infoClock, setInfoClock] = useState([]);

  const createInitialInfoClock = () => {
    const initialInfoClock = [];
    const currentDate = new Date();

    for (let hour = 0; hour < 24; hour++) {
      initialInfoClock.push({
        data: currentDate.toLocaleDateString(),
        hora: hour,
        corCirculo: 'transparent',
        evento: '',
      });
    }

    return initialInfoClock;
  };

  const updateInfoClock = (infoClock, timestamp) => {
    if (!timestamp) {
      return infoClock;
    }
  
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    const hour = date.getHours(); 
    const updatedInfoClock = [...infoClock];
    const indexToUpdate = updatedInfoClock.findIndex((item) => item.hora === hour);
  
    if (indexToUpdate !== -1) {
      updatedInfoClock[indexToUpdate] = {
        ...updatedInfoClock[indexToUpdate],
        corCirculo: 'Green',
        evento: 'Recorded',
        data: formattedDate,
      };
    }
    return updatedInfoClock;
  };
  useEffect(() => {
    setInfoClock(createInitialInfoClock());

    const updateInterval = setInterval(() => {
      const timestamp = Date.now();
      setInfoClock((prevInfoClock) => updateInfoClock(prevInfoClock, timestamp));
    }, 1000);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {infoClock.map((item) => (
        <View key={item.hora} style={styles.item}>
          <Text>Data: {item.data}</Text>
          <Text>Hour: {item.hora}:00</Text>
          <Text>Color: {item.corCirculo}</Text>
          <Text>Event: {item.evento}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'pink'
  },
  item: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 8,
    borderRadius: 4,
  },
});

export default Feedback;
