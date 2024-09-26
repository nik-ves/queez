import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  shuffleArray,
  getAnswerIfExist,
  isObjectEmpty,
} from "../../utils/helpers";
import { useQuizResult } from "../../hooks/useQuizResult";

export default function AnswerDragDrop({ answers, correctAnswers }) {
  const { quizResult, setPreventAnswer } = useQuizResult();

  const existingAnswer = getAnswerIfExist(
    quizResult.dragdrop,
    answers[0]?.questionId
  );

  const [shuffledArray, setShuffledArray] = useState([]);
  // const [selectedAnswers, setSelectedAnswers] = useState(
  //   existingAnswer.length > 0 ? existingAnswer : []
  // );
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  function handleOnDrag(event, answer) {
    event.dataTransfer?.setData("answer", JSON.stringify(answer));
  }

  useEffect(() => {
    if (existingAnswer?.length > 0) {
      setPreventAnswer(false);
      setSelectedAnswers(existingAnswer);
    }

    const shuffled = shuffleArray(answers);
    setShuffledArray(shuffled);

    return () => {
      setPreventAnswer(true);
    };
  }, [answers]);

  return (
    <AnswerBody>
      <Answers>
        {shuffledArray.map((answer, idx) => (
          <AnswerLine
            key={idx}
            draggable
            onDragStart={(event) => handleOnDrag(event, answer)}
          >
            {selectedAnswers.length === correctAnswers
              ? answer.correctArrayPlace + 1 + " - " + answer.text
              : answer.text}
          </AnswerLine>
        ))}
      </Answers>

      <DropBody>
        {correctAnswers > 0 &&
          [...Array(correctAnswers)].map((x, i) => (
            <DropLine
              key={i}
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
              correctAnswers={correctAnswers}
              answers={answers}
              index={i}
            />
          ))}
      </DropBody>
    </AnswerBody>
  );
}

function DropLine({
  index,
  answers,
  setSelectedAnswers,
  selectedAnswers,
  correctAnswers,
}) {
  const { quizResult, answerDragDrop, setPreventAnswer } = useQuizResult();
  const existingAnswer = getAnswerIfExist(
    quizResult.dragdrop,
    answers[0]?.questionId,
    index
  )[0];
  const [answer, setAnswer] = useState(existingAnswer?.text || null);

  function handleOnDrop(event) {
    const draggedAnswer = JSON.parse(event.dataTransfer?.getData("answer"));

    if (selectedAnswers.length !== correctAnswers) {
      setAnswer(draggedAnswer);
      setSelectedAnswers((prevState) => {
        let duplicate = prevState.find((item) => item.id === index);

        if (duplicate) {
          const filteredState = prevState.map((obj) =>
            obj.id === duplicate.id
              ? {
                  ...obj,
                  correctArrayPlace: draggedAnswer.correctArrayPlace,
                  text: draggedAnswer.text,
                  questionId: draggedAnswer.questionId,
                }
              : obj
          );

          return [...filteredState];
        }

        return [
          ...prevState,
          {
            id: index,
            correctArrayPlace: draggedAnswer.correctArrayPlace,
            text: draggedAnswer.text,
            questionId: draggedAnswer.questionId,
          },
        ];
      });

      answerDragDrop(
        {
          id: index,
          correctArrayPlace: draggedAnswer.correctArrayPlace,
          text: draggedAnswer.text,
          questionId: draggedAnswer.questionId,
        },
        answers,
        correctAnswers
      );
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function setStyles() {
    if (selectedAnswers.length === correctAnswers) {
      if (answer?.correctArrayPlace === index) {
        return { backgroundColor: "green" };
      } else {
        return { backgroundColor: "red" };
      }
    } else {
      return {};
    }
  }

  useEffect(() => {
    if (existingAnswer && !isObjectEmpty(existingAnswer)) {
      setAnswer(existingAnswer);
      setPreventAnswer(false);
    }
  }, [answers]);

  return (
    <AnswerLine
      style={setStyles()}
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
    >
      {answer ? answer.text : <>&nbsp;</>}
    </AnswerLine>
  );
}

const AnswerLine = styled.button`
  border: 1px solid white;
  width: 100%;
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

  &.correct {
    background-color: green;
  }

  &.wrong {
    background-color: red;
  }

  &:active,
  &:visited,
  &:focus {
    outline: none;
  }
`;

const AnswerBody = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Answers = styled.div`
  width: 45%;
`;

const DropBody = styled.div`
  width: 45%;
`;
