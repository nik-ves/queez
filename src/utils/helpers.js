export function shuffleArray(_array) {
  let shuffled = _array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled;
}

export function isObjectEmpty(_objectName) {
  return Object.keys(_objectName)?.length === 0;
}

export function getLastElement(_array) {
  return _array[_array.length - 1];
}
