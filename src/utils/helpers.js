export function shuffleArray(array) {
  let shuffled = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled;
}

export function isObjectEmpty(objectName) {
  return Object.keys(objectName)?.length === 0;
}
