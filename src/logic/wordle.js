const possibleWords = [`apple`, `world`, `words`, `index`];

export const config = {
  wordLength: 5,
  maxAttempts: 6,
};

export const gameState = {
  currentAttempt: 0,
  currentPosition: 0,
  targetWord: await getRandomWord(),

};

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * possibleWords.length);
  return possibleWords[randomIndex];
}

export async function checkGuess(guess) {
    const lower = guess.toLowerCase();

    const isValid = await isValidWord(lower);
    if(!isValid) {
        return;
    }

    const targetLetters = gameState.targetWord.toLowerCase().split("");
    const guessLetters = lower.split("");

    return guessLetters.map((letter, index) => {
        if (letter === targetLetters[index]) {
            return "correct";
        } else if (targetLetters.includes(letter)) {
            return "misplaced";
        } else {
            return "incorrect";
        }
    });
}

async function isValidWord(word) {
  const response = await fetch (
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  return response.ok; 
}