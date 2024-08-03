import { useEffect, useState } from "react";
import styled from "styled-components";

import { shuffleArray } from "../../utils/helpers";

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
    const shuffled = shuffleArray(answers);
    setShuffledArray(shuffled);

    return () => {
      setCorrectAnswer(null);
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
              onClick={() => setCorrectAnswer(answer.isCorrect)}
            >
              {answer.text}
            </AnswerLine>
          );
        } else {
          return (
            <CodeBox
              key={idx}
              style={getStyles(answer.isCorrect)}
              onClick={() => setCorrectAnswer(answer.isCorrect)}
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

  font-size: 15px;
  transition: all 0.2s;
  font-weight: inherit;
  color: white;

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
