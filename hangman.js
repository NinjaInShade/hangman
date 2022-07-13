const livesTxt = document.getElementById('lives');
const alphabetContainer = document.getElementById('alphabet-container');
const guessContainer = document.getElementById('guess');
const heart = document.getElementById('heart');
const heartBroken = document.getElementById('heart-broken');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

let lives = 10;
let word;

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

const setupGame = () => {
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
    if (document.getElementById(e.key).classList.contains('letter--pressed')) return;

    document.getElementById(e.key).classList.add('letter--pressed');

    if (!word.split('').includes(e.key)) {
      return deductLife();
    } else {
      const correctLetters = document.getElementsByClassName(`guess-${e.key}`);

      for (let k = 0; k < correctLetters.length; k++) {
        correctLetters[k].innerText = e.key;
      }
    }
  });

  // Display number of letters
  for (let j = 0; j < word.length; j++) {
    const wordLetter = document.createElement('div');

    wordLetter.classList.add('guess-letter', `guess-${word[j]}`);

    guessContainer.appendChild(wordLetter);
  }
};

const fetchWord = async () => {
  const request = await fetch('https://random-word-api.herokuapp.com/word');
  const wordFetched = await request.json();

  word = wordFetched[0];

  console.log(word);

  setupGame();
};

fetchWord();
