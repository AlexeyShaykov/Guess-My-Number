import { StyleSheet, View, TextInput, Alert } from 'react-native';

import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import Title from '../components/ui/Title';
import InstructionText from '../components/ui/InstructionText';

import Colors from '../constants/colors';

import { useState } from 'react';

const GameStartScreen = ({ onPickNumber }) => {
  const [inputValue, setInputValue] = useState('');

  const resetInputValueHandler = () => {
    setInputValue('');
  };

  const onConfirmInputValue = () => {
    const inputNumber = parseInt(inputValue, 10);


    if (isNaN(inputNumber) || inputNumber <= 0 || inputNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Please enter a number between 1 and 99',
        [{
          text: 'OK',
          style: 'destructive',
          onPress: resetInputValueHandler,
        }]
      );
      return;
    }

    onPickNumber(inputNumber);
  };

  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>
          Enter a Number
        </InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setInputValue}
          value={inputValue}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputValueHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={onConfirmInputValue}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
};

export default GameStartScreen;


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
