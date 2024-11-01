import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { useRef, useState, useMemo, useEffect } from'react';

import { Ionicons } from '@expo/vector-icons';

import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

import NumberContainer from '../components/game/NumberContainer';
import GuessLogItem from '../components/game/GuessLogItem';

import { generateRandomNumber } from '../utils';

const GameScreen = ({ userNumber, onGameOver }) => {
  const refs = useRef({
    minNumber: 1,
    maxNumber: 100,
  });
  const initialGuess = useMemo(() => {
    return generateRandomNumber(refs.current.minNumber, refs.current.maxNumber, userNumber);
  }, [userNumber]);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      refs.current.maxNumber = currentGuess;
    } else {
      refs.current.minNumber = currentGuess + 1;
    }

    const newRndNumber = generateRandomNumber(
      refs.current.minNumber,
      refs.current.maxNumber,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((__prevGuessRounds) => [...__prevGuessRounds, newRndNumber]);
  };

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [userNumber, currentGuess, onGameOver, guessRounds]);

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler('lower')}>
            <Ionicons name="remove" size={16} color="white" />
          </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => nextGuessHandler('greater')}>
            <Ionicons name="add" size={16} color="white" />
          </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRounds.length - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    paddingTop: 64,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

export default GameScreen;
