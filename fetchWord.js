export const fetchWordData = async () => {
  let request = await fetch('https://random-word-api.herokuapp.com/word');
  let wordFetched = await request.json();

  let definitionRequest = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${wordFetched[0]}`
  );
  const wordDefinition = await definitionRequest.json();

  return { word: wordFetched[0], definition: wordDefinition, status: definitionRequest.status };
};
