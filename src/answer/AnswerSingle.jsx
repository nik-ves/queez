import { useEffect, useState } from "react";
import styled from "styled-components";

export default function AnswerSingle({ answers }) {
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [shuffledArray, setShuffledArray] = useState([]);

  function getStyles(isCorrect) {
    if (correctAnswer !== null) {
      if (isCorrect === true) {
        return { borderColor: "green", scale: "1.02" };
      } else {
        return { borderColor: "red" };
      }
    }
  }

  useEffect(() => {
    function shuffleArray(array) {
      let shuffled = array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      setShuffledArray(shuffled);
    }

    shuffleArray(answers);

    return () => {
      setCorrectAnswer(null);
    };
  }, [answers]);

  return (
    <>
      {shuffledArray?.map((answer, idx) => {
        return (
          <AnswerLine
            style={getStyles(answer.isCorrect)}
            onClick={() => setCorrectAnswer(answer.isCorrect)}
            key={idx}
          >
            {answer.text}
          </AnswerLine>
        );
      })}
    </>
  );
}

const AnswerLine = styled.button`
  border: 1px solid white;
  width: 100%;
  padding: 0 15px;
  padding: 10px;
  font-size: 15px;
  transition: all 0.2s;
  font-weight: inherit;

  background-color: transparent;
  font-weight: inherit;
  text-align: left;
  border-radius: 0;
  margin-bottom: 15px;
  outline: none;

  &:hover {
    cursor: pointer;
    border-color: #646cff;
  }

  &.active {
    border-color: #646cff;
    scale: 1.03;
  }

  &:active,
  &:visited,
  &:focus {
    outline: none;
  }
`;
