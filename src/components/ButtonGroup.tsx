import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonGroupProps {
  options: number[];
  selectedOption: number;
  setSelectedOption: (option: number) => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options, selectedOption, setSelectedOption }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[styles.button, selectedOption === option && styles.activeButton]}
          onPress={() => setSelectedOption(option)}
        >
          <Text style={[styles.buttonText, selectedOption === option && styles.activeButtonText]}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    fontSize: 16,
  },
  activeButtonText: {
    color: '#000',
  },
});

export default ButtonGroup;
