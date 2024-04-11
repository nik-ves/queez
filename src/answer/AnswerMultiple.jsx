import { useEffect, useState } from "react";
import styled from "styled-components";

import { shuffleArray } from "../utils/helpers";

export default function AnswerMultiple({ answers }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [shuffledArray, setShuffledArray] = useState([]);
  let correctArray = answers.filter((answer) => answer.isCorrect === true);

  function handleAnswers(id) {
    setSelectedAnswers((answers) => {
      if (answers.find((d) => d === id)) {
        return [...answers];
      }

      return [...answers, id];
    });
  }

  function check(id) {
    if (selectedAnswers.length > 0) {
      return selectedAnswers.find((answerId) => answerId === id);
    }
  }

  function getStyles(isCorrect) {
    if (selectedAnswers?.length >= correctArray?.length) {
      if (isCorrect === true) {
        return { borderColor: "green", scale: "1.02" };
      } else {
        return { borderColor: "red", scale: "1" };
      }
    }
  }

  useEffect(() => {
    const shuffled = shuffleArray(answers);
    setShuffledArray(shuffled);

    return () => {
      setSelectedAnswers([]);
    };
  }, [answers]);

  return (
    <>
      {shuffledArray?.map((answer, idx) => {
        return (
          <AnswerLine
            style={getStyles(answer.isCorrect)}
            onClick={() => handleAnswers(answer.id)}
            key={idx}
            className={check(answer.id) ? "active" : "undefined"}
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
