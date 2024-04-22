import { useEffect, useState } from "react";
import styled from "styled-components";

import { shuffleArray } from "../utils/helpers";

export default function AnswerMultiple({ answers }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [shuffledArray, setShuffledArray] = useState([]);
  let correctArray = answers.filter((answer) => answer.isCorrect === true);

  function handleAnswers(id) {
    if (selectedAnswers?.length === correctArray?.length) return;

    setSelectedAnswers((answers) => {
      if (answers.find((d) => d === id)) {
        return answers.filter((d) => d !== id);
      }

      return [...answers, id];
    });
  }

  function answerExists(id) {
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
        if (answer.type === "text") {
          return (
            <AnswerLine
              key={idx}
              style={getStyles(answer.isCorrect)}
              onClick={() => handleAnswers(answer.id)}
              className={answerExists(answer.id) ? "active" : "undefined"}
            >
              {answer.text}
            </AnswerLine>
          );
        } else {
          return (
            <CodeBox
              key={idx}
              style={getStyles(answer.isCorrect)}
              onClick={() => handleAnswers(answer.id)}
              className={answerExists(answer.id) ? "active" : "undefined"}
            >
              <code>{answer.text}</code>
            </CodeBox>
          );
        }
      })}
    </>
  );
}

const CodeBox = styled.div`
  margin-bottom: 10px;
  padding: 20px;
  border: 1px solid white;
  color: white;

  @media only screen and (max-width: 1000px) {
    padding: 10px;
  }

  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }

  font-size: 15px;
  transition: all 0.2s;
  font-weight: inherit;

  &:hover {
    cursor: pointer;
    border-color: #646cff;
  }

  &.active {
    border-color: #646cff;
    scale: 1.03;
  }
`;

const AnswerLine = styled.button`
  border: 1px solid white;
  width: 100%;
  padding: 0 15px;
  padding: 10px;
  font-size: 15px;
  transition: all 0.2s;
  font-weight: inherit;
  color: white;

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
