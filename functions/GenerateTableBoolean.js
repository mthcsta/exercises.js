function GenerateTableBoolean(numberOfElements) {
  const length = Math.pow(2, numberOfElements);
  const fn = (_, index) => index.toString(2)                        // Decimal to Binary
                                .padStart(numberOfElements, '0')    // Add left 0s
                                .split('')                          // String to Array
                                .map(Number);                       // Array of String to Array of Numbers
    
  return Array.from({length}, fn);
}
