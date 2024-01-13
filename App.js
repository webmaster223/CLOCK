import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Clock from './Components/clock';
import MyCalendar from './Components/Calendar';
import RecordingButton from './Components/RecordingButton';
import FeedButton from './Components/FeedButton';
import PlanButton from './Components/PlanButton';
import Feedback from './Components/Feedback';
import Plan from './Components/Plan';
// import Page from './Components/Page';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isClockVisible, setClockVisible] = useState(true);

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
    setClockVisible(!isClockVisible);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    toggleCalendar();
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Button title="Calendar" onPress={toggleCalendar} />
        {isCalendarVisible && (
          <MyCalendar isVisible={isCalendarVisible} onDayPress={handleDayPress} />
        )}
        <Text>{selectedDate}</Text>
        <RecordingButton />
      </View>
      {isClockVisible && (
        <View style={styles.clockContainer}>
          <Clock />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <PlanButton navigation={navigation} />
        <View style={{width: 20, height: 10}}></View>
        <FeedButton navigation={navigation} />
      </View>
      {/* <Page /> */}
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="VoiveWave" component={HomeScreen} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen name="Plan" component={Plan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  clockContainer: {
    alignItems: 'center',
  },
  calendarContainer: {
    right: 10,
    top: 30,
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    zIndex: 1
  },
  buttonContainer: {
    padding: 20,
    bottom: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  }
});
