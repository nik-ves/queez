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

export function equalArrays(_first, _second, _sort = false) {
  if (_sort === true) {
    let sortedFirst = Object.keys(_first)
      .sort()
      .reduce(function (acc, key) {
        acc[key] = _first[key];
        return acc;
      }, {});

    let sortedSecond = Object.keys(_second)
      .sort()
      .reduce(function (acc, key) {
        acc[key] = _second[key];
        return acc;
      }, {});

    return JSON.stringify(sortedFirst) === JSON.stringify(sortedSecond);
  } else {
    return JSON.stringify(_first) === JSON.stringify(_second);
  }
}

export function equalArraysDragDrop(_first, _second) {
  let sortedSecond = _second.sort(
    (a, b) => a.correctArrayPlace - b.correctArrayPlace
  );

  return JSON.stringify(_first) === JSON.stringify(sortedSecond);
}

export function getAnswerIfExist(_quizResult, _questionId, _idx) {
  let { correct, incorrect } = _quizResult;

  let existsCorrect = correct.filter((answer) => {
    if (_idx !== undefined) {
      return answer.questionId === _questionId && answer.id === _idx;
    }

    return answer.questionId === _questionId;
  });

  if (existsCorrect.length > 0) return existsCorrect;

  let existsIncorrect = incorrect.filter((answer) => {
    if (_idx !== undefined) {
      return answer.questionId === _questionId && answer.id === _idx;
    }

    return answer.questionId === _questionId;
  });

  return existsIncorrect;
}
