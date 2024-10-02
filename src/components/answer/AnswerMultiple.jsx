import { useEffect, useState } from "react";
import styled from "styled-components";

import { shuffleArray, getAnswerIfExist } from "../../utils/helpers";
import { useQuizResult } from "../../hooks/useQuizResult";

export default function AnswerMultiple({ answers }) {
  const { answerMultiple, setPreventAnswer, quizResult } = useQuizResult();
  const existingAnswer = getAnswerIfExist(
    quizResult.multiple,
    answers[0].questionId
  );
  const [selectedAnswers, setSelectedAnswers] = useState(
    existingAnswer?.length > 0 ? existingAnswer : []
  );
  const [shuffledArray, setShuffledArray] = useState([]);

  let correctAnswers = answers?.filter((answer) => answer.isCorrect === true);

  function handleAnswers(id) {
    if (selectedAnswers?.length === correctAnswers?.length) {
      return;
    }

    setSelectedAnswers((answers) => {
      if (answers?.find((d) => d === id)) {
        return answers?.filter((d) => d !== id);
      }

      return [...answers, id];
    });
  }

  function answerExists(id) {
    if (selectedAnswers?.length > 0) {
      return selectedAnswers.find((answerId) => answerId === id);
    }
  }

  function getStyles(isCorrect) {
    if (selectedAnswers?.length >= correctAnswers?.length) {
      if (isCorrect === true) {
        return { borderColor: "green", scale: "1.02" };
      } else {
        return { borderColor: "red", scale: "1" };
      }
    }
  }

  useEffect(() => {
    if (selectedAnswers.length > 0) {
      setSelectedAnswers(existingAnswer);
      setPreventAnswer(false);
    }

    const shuffled = shuffleArray(answers);
    setShuffledArray(shuffled);

    return () => {
      setPreventAnswer(true);
    };
  }, [answers]);

  useEffect(() => {
    if (selectedAnswers?.length != correctAnswers?.length) {
      setPreventAnswer(true);
    }
  }, [selectedAnswers]);

  return (
    <>
      {shuffledArray?.map((answer, idx) => {
        if (answer.type === "text") {
          return (
            <AnswerLine
              key={idx}
              disabled={selectedAnswers?.length === correctAnswers?.length}
              style={getStyles(answer.isCorrect)}
              onClick={() => {
                answerMultiple(answer, correctAnswers);
                handleAnswers(answer.id);
              }}
              className={answerExists(answer.id) ? "active" : "undefined"}
            >
              {answer.text}
            </AnswerLine>
          );
        } else {
          return (
            <CodeBox
              key={idx}
              disabled={selectedAnswers?.length === correctAnswers?.length}
              style={getStyles(answer.isCorrect)}
              onClick={() => {
                answerMultiple(answer, correctAnswers);
                handleAnswers(answer.id);
              }}
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

  @media only screen and (max-width: 1000px) {
    padding: 10px;
  }

  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }

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
