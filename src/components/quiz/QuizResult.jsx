import styled from "styled-components";
import { percentage } from "../../utils/helpers";
import { useQuiz } from "../../context/QuizContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizResult() {
  const { quizResult, quizStatus, startQuiz, setIncorrectQuestions } =
    useQuiz();

  const navigate = useNavigate();

  const { correct: correctSingle, incorrect: incorrectSingle } =
    quizResult.single;
  const { correct: correctMultiple, incorrect: incorrectMultiple } =
    quizResult.multiple;
  const { correct: correctDragdrop, incorrect: incorrectDragdrop } =
    quizResult.dragdrop;
  const { correct: correctDropdown, incorrect: incorrectDropdown } =
    quizResult.dropdown;

  // SINGLE DATA
  const singleCorrect = correctSingle?.map((answer) => {
    return answer.questionId;
  });
  const singleIncorrect = incorrectSingle?.map((answer) => {
    return answer.questionId;
  });

  // MULTIPLE DATA
  const multipleCorrect = Array.from(
    new Set(
      correctMultiple.map((answer) => {
        return answer.questionId;
      })
    )
  ).map((answer) => {
    return answer;
  });

  const multipleIncorrect = Array.from(
    new Set(
      incorrectMultiple.map((answer) => {
        return answer.questionId;
      })
    )
  ).map((answer) => {
    return answer;
  });

  // DRAGDROP DATA
  const dragdropCorrect = Array.from(
    new Set(
      correctDragdrop.map((answer) => {
        return answer.questionId;
      })
    )
  ).map((answer) => {
    return answer;
  });

  const dragdropIncorrect = Array.from(
    new Set(
      incorrectDragdrop.map((answer) => {
        return answer.questionId;
      })
    )
  ).map((answer) => {
    return answer;
  });

  // DROPDOWN DATA
  const dropdownCorrect = Array.from(
    new Set(
      correctDropdown.map((answer) => {
        return answer.questionId;
      })
    )
  ).map((answer) => {
    return answer;
  });

  const dropdownIncorrect = Array.from(
    new Set(
      incorrectDropdown.map((answer) => {
        return answer.questionId;
      })
    )
  ).map((answer) => {
    return answer;
  });

  const numOfCorrect =
    singleCorrect.length +
    multipleCorrect.length +
    dragdropCorrect.length +
    dropdownCorrect.length;

  const numOfIncorrect =
    singleIncorrect.length +
    multipleIncorrect.length +
    dragdropIncorrect.length +
    dropdownIncorrect.length;

  const total = numOfCorrect + numOfIncorrect;

  const successPercentage = percentage(numOfCorrect, total);

  const totalIncorrect = [
    ...singleIncorrect,
    ...multipleIncorrect,
    ...dragdropIncorrect,
    ...dropdownIncorrect,
  ].sort((a, b) => a - b);

  useEffect(() => {
    setIncorrectQuestions(totalIncorrect);
  }, []);

  return (
    <Body>
      <h1>{successPercentage >= 70 ? "You passed!" : "You failed."}</h1>

      <Details>
        <h2>Correct answers: {numOfCorrect}</h2>
        <h2>Incorrect answers: {numOfIncorrect}</h2>
      </Details>

      <Actions>
        <button
          onClick={() => {
            startQuiz(quizStatus?.quizId);
          }}
        >
          Start again
        </button>
        {totalIncorrect.length > 0 ? (
          <button
            onClick={() => {
              navigate(
                `/quizId/${quizStatus?.quizId}/questionId/${totalIncorrect[0]}`
              );
            }}
          >
            Review incorrect answers
          </button>
        ) : null}
      </Actions>
    </Body>
  );
}

const Body = styled.div`
  margin-top: 50px;
  background-color: #242424;
  padding: 20px;
  border-radius: 10px;

  & h1 {
    text-align: center;
    color: #646cff;
  }
`;

const Details = styled.div`
  margin-top: 20px;
  font-size: 20px;

  & h2:first-child {
    color: darkgreen;
  }

  & h2:last-child {
    color: darkred;
  }
`;

const Actions = styled.div`
  margin-top: 20px;

  display: flex;
  gap: 20px;
`;
