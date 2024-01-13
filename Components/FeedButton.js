import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const FeedButton = ({ navigation }) => {
  const feedclick = () => {
    console.log("Feedback Button Clicked");
    navigation.navigate('Feedback');
  };

  return (
    <TouchableOpacity style={styles.PlanButton} onPress={feedclick}>
      <Text style={styles.buttonText}>{"Feedback"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    PlanButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: 100,  // Specify the width
    height: 40,  // Specify the height
    backgroundColor: 'blue', // Transparent background
    borderRadius: 10,
  },
  buttonText:{
    color: 'white',
    textAlign: 'center',
  }
});

export default FeedButton;
