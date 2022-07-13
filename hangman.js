const livesTxt = document.getElementById('lives');
const alphabetContainer = document.getElementById('alphabet-container');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';

let lives = 10;
let word;

const fetchWord = async () => {
  const request = await fetch('https://random-word-api.herokuapp.com/word');
  const wordFetched = await request.json();

  word = wordFetched[0];
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
    document.getElementById(e.key).classList.add('letter--pressed');
  });
};

fetchWord();
setupGame();
