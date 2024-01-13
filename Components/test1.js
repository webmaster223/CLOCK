import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Svg, { Circle, Text as SvgText, Line, G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedNumber, setSelectedNumber] = useState(null); // State to keep track of the selected number and its background color

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const center = { x: 100, y: 100 };
  const radius = 80;
  const numbers = Array.from({ length: 12 }, (_, index) => index + 1);

  const calculatePosition = (number) => {
    const angle = ((number - 3) * Math.PI) / 6;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    return { x, y };
  };

  const handleNumberClick = async (number) => {
    if (selectedNumber === number) {
      // If the selected number is clicked again, clear the selection
      setSelectedNumber(null);
      await AsyncStorage.removeItem('selectedNumber'); // Clear the saved selected number
    } else {
      // Otherwise, set the selected number and its background color
      setSelectedNumber(number);
      await AsyncStorage.setItem('selectedNumber', number.toString()); // Save the selected number
    }
  };

  const hour = (currentTime.getHours() % 12) * 30 + (currentTime.getMinutes() / 60) * 30;
  const minute = currentTime.getMinutes() * 6 + (currentTime.getSeconds() / 60) * 6;
  const second = currentTime.getSeconds() * 6;

  return (
    <View style={styles.container}>
      <Svg width="200" height="200">
        <Circle cx={center.x} cy={center.y} r={radius} fill="pink" />
        {/* Clock hands */}
        <Line
          x1={center.x}
          y1={center.y}
          x2={center.x + Math.cos((hour - 90) * (Math.PI / 180)) * radius * 0.6}
          y2={center.y + Math.sin((hour - 90) * (Math.PI / 180)) * radius * 0.6}
          stroke="black"
          strokeWidth="4"
        />
        <Line
          x1={center.x}
          y1={center.y}
          x2={center.x + Math.cos((minute - 90) * (Math.PI / 180)) * radius * 0.8}
          y2={center.y + Math.sin((minute - 90) * (Math.PI / 180)) * radius * 0.8}
          stroke="black"
          strokeWidth="3"
        />
        <Line
          x1={center.x}
          y1={center.y}
          x2={center.x + Math.cos((second - 90) * (Math.PI / 180)) * radius * 0.8}
          y2={center.y + Math.sin((second - 90) * (Math.PI / 180)) * radius * 0.8}
          stroke="black"
          strokeWidth="2"
        />

        {/* Numbers */}
        <G>
          {numbers.map((number) => {
            const position = calculatePosition(number);
            return (
              <G key={number} onPress={() => handleNumberClick(number)}>
                <Circle
                  cx={position.x}
                  cy={position.y - 6}
                  r="15" // Adjust the radius as needed
                  fill={selectedNumber === number ? 'lightblue' : 'transparent'} // Background color based on selection
                />
                <SvgText
                  x={position.x}
                  y={position.y}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="bold"
                  fill="black"
                >
                  {number}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink', // Set the background color to pink
  },
});

export default Clock;