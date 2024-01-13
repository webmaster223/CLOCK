import React from 'react';
import { View } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';

const MyCalendar = ({ isVisible, onDayPress }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View>
      <RNCalendar onDayPress={onDayPress} />
    </View>
  );
};

export default MyCalendar;