import { useEffect, useState } from "react";
import styled from "styled-components";

import { shuffleArray } from "../utils/helpers";

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
        return (
          <>
            {answer.type === "text" ? (
              <>
                <AnswerLine
                  style={getStyles(answer.isCorrect)}
                  onClick={() => setCorrectAnswer(answer.isCorrect)}
                  key={idx}
                >
                  {answer.text}
                </AnswerLine>
              </>
            ) : (
              <>
                <CodeBox
                  style={getStyles(answer.isCorrect)}
                  onClick={() => setCorrectAnswer(answer.isCorrect)}
                  key={idx}
                >
                  <code>{answer.text}</code>
                </CodeBox>
              </>
            )}
          </>
        );
      })}
    </>
  );
}

const CodeBox = styled.div`
  margin-bottom: 10px;
  padding: 20px;

  border: 1px solid white;
  width: 100%;

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
