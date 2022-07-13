export const createAlphabet = () => {
  const alphabetContainer = document.getElementById('alphabet-container');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < alphabet.length; i++) {
    const newLetter = document.createElement('div');

    newLetter.classList.add('letter');
    newLetter.setAttribute('id', alphabet[i]);
    newLetter.innerText = alphabet[i];

    alphabetContainer.appendChild(newLetter);
  }
};

export const displayDefinitions = (word) => {
  const guessDefinition = document.getElementById('guess-definition');

  for (let i = 0; i < word.definition[0].meanings.length; i++) {
    for (let j = 0; j < word.definition[0].meanings[i].definitions.length; j++) {
      const newDefinition = document.createElement('small');

      newDefinition.classList.add('txt-s');
      newDefinition.innerText = `"${word.definition[0].meanings[i].definitions[j].definition}"`;

      guessDefinition.appendChild(newDefinition);
    }
  }
};
