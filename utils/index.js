export const generateRandomNumber = (min, max, exclude) => {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  if (number === exclude) {
    return generateRandomNumber(min, max, exclude);
  }

  return number;
};
