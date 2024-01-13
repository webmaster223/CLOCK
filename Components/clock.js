import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Svg, { Circle, Text as SvgText, Line, G } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [isRecordingPlanned, setIsRecordingPlanned] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const center = { x: 100, y: 100 };
  const radius = 80;
  const numbers = Array.from({ length: 12 }, (_, index) => index + 1);

  const calculatePosition = (hour) => {
    const angle = ((hour - 3) * Math.PI) / 6;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    return { x, y };
  };

  const handleNumberClick = async (hour) => {
    if (selectedHour === hour) {
      setSelectedHour(null);
      setRecordingStatus('');
      await AsyncStorage.removeItem('selectedHour');
    } else {
      setSelectedHour(hour);
      setRecordingStatus('');
      await AsyncStorage.setItem('selectedHour', hour.toString());
    }
  };

  const handlePlanRecording = () => {
    if (selectedHour !== null) {
      setRecordingStatus('Recording planned');
      setIsRecordingPlanned(true);
      setTimeout(() => {
        // setIsRecordingPlanned(true);
        setRecordingStatus('');
        setSelectedHour(null);
      }, 5000);
    }
  };

  const hour = (currentTime.getHours() % 12) * 30 + (currentTime.getMinutes() / 60) * 30;
  const minute = currentTime.getMinutes() * 6 + (currentTime.getSeconds() / 60) * 6;
  const second = currentTime.getSeconds() * 6;

  return (
    <View style={styles.container}>
      <Svg width="200" height="200">
        <Circle cx={center.x} cy={center.y} r={radius} fill="pink" />
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
        {/* ... (other clock hands) */}
        <G>
          {numbers.map((hour) => {
            const position = calculatePosition(hour);
            return (
              <G key={hour} onPress={() => handleNumberClick(hour)}>
                <Circle
                  cx={position.x - 1}
                  cy={position.y - 5}
                  r="15"
                  fill={selectedHour === hour ? 'lightblue' : 'transparent'}
                />
                <SvgText
                  x={position.x}
                  y={position.y}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="bold"
                  fill="black"
                >
                  {hour}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
      {selectedHour !== null && !isRecordingPlanned && (
        <Button title="Plan Recording" onPress={handlePlanRecording} />
      )}
      {selectedHour !== null && (
        <Text>
          Selected Hour: {selectedHour}:00
          {'\n'}
          {recordingStatus}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});

export default Clock;
