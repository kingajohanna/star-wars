import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../theme/colors';

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
    gap: 8,
    marginVertical: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,

    borderWidth: 3,
    borderRadius: 5,
    borderColor: colors.greenOpacity,
  },
  activeButton: {
    backgroundColor: colors.greenOpacity,
  },
  buttonText: {
    fontSize: 16,
    color: colors.greenOpacity,
  },
  activeButtonText: {
    color: colors.black,
  },
});

export default ButtonGroup;
