export function validateCardWithLuhn(card: string): boolean {
  const cardNumbers = card.split('').map(Number).reverse();
  const cardNumbersSumatory = cardNumbers.reduce(
    (total, currentDigit, currentDigitIndex) => {
      if (currentDigitIndex % 2 !== 0) {
        currentDigit = currentDigit * 2;
        if (currentDigit > 9) {
          currentDigit = currentDigit - 9;
        }
      }
      return total + currentDigit;
    },
    0,
  );
  return cardNumbersSumatory % 10 === 0;
}
