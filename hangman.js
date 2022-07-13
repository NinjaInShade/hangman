import { fetchWordData } from './fetchWord.js';
import { createAlphabet, displayDefinitions } from './utils.js';

const livesTxt = document.getElementById('lives');

const guessContainer = document.getElementById('guess');

const heart = document.getElementById('heart');
const heartBroken = document.getElementById('heart-broken');

let gameWon = false;
let lives = 10;

// Lives logic
const deductLife = (word) => {
  const letterFields = document.getElementsByClassName('guess-letter');

  lives -= 1;
  livesTxt.innerText = `Lives: ${lives}`;

  if (lives === 0) {
    for (let j = 0; j < word.word.length; j++) {
      letterFields[j].classList.add('guess-letter--pre-animation');

      setTimeout(() => {
        letterFields[j].innerText = word.word[j];
      }, 150);

      setTimeout(() => {
        letterFields[j].classList.remove('guess-letter--pre-animation');
      }, 150);
    }

    displayDefinitions(word);
  } else if (lives <= 3) {
    heart.classList.add('hidden');
    heartBroken.classList.remove('hidden');
  }
};

// Win check
const winCheck = (word) => {
  const letterFields = document.getElementsByClassName('guess-letter');

  let wordComparison = '';

  for (let o = 0; o < letterFields.length; o++) {
    wordComparison = wordComparison + letterFields[o].innerText;
  }

  if (wordComparison === word.word) {
    displayDefinitions(word);

    gameWon = true;
  }
};

const setupGame = (word) => {
  livesTxt.innerText = `Lives: ${lives}`;

  // Display alphabet
  createAlphabet();

  // Add event listener for keyboard press
  document.addEventListener('keydown', (e) => {
    if (
      document.getElementById(e.key).classList.contains('letter--pressed') ||
      lives === 0 ||
      gameWon
    )
      return;

    document.getElementById(e.key).classList.add('letter--pressed');

    // Check if word contains key pressed
    if (!word.word.split('').includes(e.key)) {
      return deductLife(word);
    } else {
      const correctLetters = document.getElementsByClassName(`guess-${e.key}`);

      for (let k = 0; k < correctLetters.length; k++) {
        correctLetters[k].classList.add('guess-letter--pre-animation');

        setTimeout(() => {
          correctLetters[k].innerText = e.key;

          winCheck(word);
        }, 150);

        setTimeout(() => {
          correctLetters[k].classList.remove('guess-letter--pre-animation');
        }, 150);
      }
    }
  });

  // Display number of letters
  for (let j = 0; j < word.word.length; j++) {
    const wordLetter = document.createElement('div');

    wordLetter.classList.add('guess-letter', `guess-${word.word[j]}`);

    guessContainer.appendChild(wordLetter);
  }
};

// Fetch random word using random word API along with dictionary API
const fetchWord = async () => {
  let wordData = await fetchWordData();

  // No definition found
  while (wordData.status === 404) {
    wordData = await fetchWordData();
  }

  return wordData;
};

(async () => {
  const word = await fetchWord();

  console.log(word);

  setupGame(word);
})();
