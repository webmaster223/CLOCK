import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const PlanButton = ({ navigation }) => {
  const planclick = () => {
    console.log("Plan Button Clicked");
    navigation.navigate('Plan');
  };

  return (
    <TouchableOpacity style={styles.PlanButton} onPress={planclick}>
      <Text style={styles.buttonText}>{"Plan"}</Text>
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

export default PlanButton;