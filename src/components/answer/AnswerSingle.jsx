import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  shuffleArray,
  getAnswerSingle,
  isObjectEmpty,
} from "../../utils/helpers";
import { useQuizResult } from "../../hooks/useQuizResult";

export default function AnswerSingle({ answers }) {
  const { quizResult, answerSingle, setPreventAnswer } = useQuizResult();
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
    const origValue = getAnswerSingle(quizResult.single, answers[0].questionId);

    if (origValue && !isObjectEmpty(origValue)) {
      setCorrectAnswer(origValue.isCorrect);
      setPreventAnswer(false);
    }

    const shuffled = shuffleArray(answers);
    setShuffledArray(shuffled);

    return () => {
      setPreventAnswer(true);
    };
  }, [answers]);

  return (
    <>
      {shuffledArray?.map((answer, idx) => {
        if (answer.type === "text") {
          return (
            <AnswerLine
              key={idx}
              disabled={correctAnswer !== null}
              style={getStyles(answer.isCorrect)}
              onClick={() => {
                answerSingle(answer);
                setCorrectAnswer(answer.isCorrect);
                setPreventAnswer(false);
              }}
            >
              {answer.text}
            </AnswerLine>
          );
        } else {
          return (
            <CodeBox
              key={idx}
              disabled={correctAnswer !== null}
              style={getStyles(answer.isCorrect)}
              onClick={() => {
                answerSingle(answer);
                setCorrectAnswer(answer.isCorrect);
                setPreventAnswer(false);
              }}
            >
              <code>{answer.text}</code>
            </CodeBox>
          );
        }
      })}
    </>
  );
}

const CodeBox = styled.button`
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
