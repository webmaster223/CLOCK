import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecordingButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [recording, setRecording] = useState(null);

  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    })();

    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isRecording && recordTime !== 0) {
      clearInterval(interval);
      setRecordTime(0);
    }

    return () => clearInterval(interval);
  }, [isRecording, recordTime]);

  const startRecording = async () => {
    try {
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setIsRecording(false);
    setRecordTime(0);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI(); 
      const customDirectory = FileSystem.documentDirectory + 'Recording/';
      const dirInfo = await FileSystem.getInfoAsync(customDirectory);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(customDirectory, { intermediates: true });
      }
      const newFilePath = customDirectory + 'Recording.mp3';
      if (uri) {
        await FileSystem.copyAsync({
          from: uri,
          to: newFilePath,
        });
        await AsyncStorage.setItem('lastRecording', newFilePath);
        console.log('Recording is in Here:', newFilePath);
      }
    } catch (error) {
      console.error('Could not stop recording', error);
    }
  };

  const handlePress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(recordTime / 60);
    const seconds = recordTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={isRecording ? styles.recordingButton : styles.button}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.statusText}>
        {isRecording ? `Recording... (${formatTime()})` : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  recordingButton: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  statusText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default RecordingButton;