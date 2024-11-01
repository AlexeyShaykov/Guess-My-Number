import { View, Text, StyleSheet, Pressable } from 'react-native';

import Colors from '../../constants/colors';

const PrimaryButton = ({ children, onPress }) => {

  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed ? [styles.pressed, styles.buttonInnerContainer] : styles.buttonInnerContainer}
        android_ripple={{
          color: Colors.primary600,
        }} // color while pressing on android
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2, // shadow only on Android
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'open-sans', 
  },
  pressed: { // pressed effect on IOS
    opacity: 0.75,
  },
});

export default PrimaryButton;
