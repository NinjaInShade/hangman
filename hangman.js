import { fetchWordData } from './fetchWord.js';

const livesTxt = document.getElementById('lives');

const alphabetContainer = document.getElementById('alphabet-container');
const guessContainer = document.getElementById('guess');
const guessDefinition = document.getElementById('guess-definition');

const heart = document.getElementById('heart');
const heartBroken = document.getElementById('heart-broken');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

let gameWon = false;
let lives = 10;

// Lives logic
const deductLife = () => {
  lives -= 1;
  livesTxt.innerText = `Lives: ${lives}`;

  if (lives === 0) {
    // TODO: Figure out cool ending
    console.log('GAME OVER!');
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
    for (let i = 0; i < word.definition[0].meanings.length; i++) {
      for (let j = 0; j < word.definition[0].meanings[i].definitions.length; j++) {
        const newDefinition = document.createElement('small');

        newDefinition.classList.add('txt-s');
        newDefinition.innerText = `"${word.definition[0].meanings[i].definitions[j].definition}"`;

        guessDefinition.appendChild(newDefinition);
      }
    }

    gameWon = true;
  }
};

const setupGame = (word) => {
  livesTxt.innerText = `Lives: ${lives}`;

  // Display alphabet
  for (let i = 0; i < alphabet.length; i++) {
    const newLetter = document.createElement('div');

    newLetter.classList.add('letter');
    newLetter.setAttribute('id', alphabet[i]);
    newLetter.innerText = alphabet[i];

    alphabetContainer.appendChild(newLetter);
  }

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
      return deductLife();
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
