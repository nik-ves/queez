import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuiz } from "../../context/QuizContext";
import { useEffect } from "react";

export default function QuizPage() {
  const { quizId } = useParams();
  const { quizzes, startQuiz, setNumOfQuestions } = useQuiz();
  const selectedQuiz = quizzes.find((quiz) => quiz.id == quizId);

  useEffect(() => {
    if (selectedQuiz?.title !== undefined) {
      document.title = `Queez | ${selectedQuiz?.title}`;
    }

    return () => {
      document.title = "Queez";
    };
  }, [selectedQuiz]);

  return (
    <QuizPageBody>
      <QuizTitle>
        <span>{selectedQuiz?.title}</span>
      </QuizTitle>

      <p>{selectedQuiz?.description}</p>

      <label>Num of questions to fetch:</label>
      <StyledSelect
        onChange={(event) => {
          setNumOfQuestions(event.target.value);
        }}
      >
        <option value={30}>30</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
        <option value={150}>150</option>
        <option value={200}>200</option>
        <option value="All">All</option>
      </StyledSelect>

      <button
        onClick={() => {
          startQuiz(quizId);
        }}
      >
        Start
      </button>
    </QuizPageBody>
  );
}

const StyledSelect = styled.select`
  width: 60px;
  margin-bottom: 30px;
  padding: 10px;
  font: inherit;
`;

const QuizPageBody = styled.section`
  margin: 100px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & label {
    color: white;
    font-size: 20px;
  }

  & p {
    white-space: pre-line;
    font-size: 20px;
    color: white;

    @media only screen and (max-width: 1000px) {
      font-size: 18px;
    }

    @media only screen and (max-width: 500px) {
      font-size: 15px;
    }
  }
`;

const QuizTitle = styled.h2`
  font-size: 40px;
  color: #535bf2;
`;
