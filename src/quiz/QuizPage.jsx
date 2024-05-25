import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuiz } from "../context/QuizContext";
import { useEffect } from "react";

export default function QuizPage() {
  const { quizId } = useParams();
  const { quizzes, getAllQuestionsIds, questionsIds } = useQuiz();
  const navigate = useNavigate();

  const selectedQuiz = quizzes.find((quiz) => quiz.id == quizId);

  useEffect(() => {
    async function getIds() {
      await getAllQuestionsIds(quizId);
    }

    getIds();
  }, []);

  return (
    <QuizPageBody>
      <QuizTitle>
        <span>{selectedQuiz?.title}</span>
      </QuizTitle>

      <p>{selectedQuiz?.description}</p>

      <button
        onClick={() => {
          navigate(`/quizId/${quizId}/questionId/${questionsIds[0]?.id}`);
        }}
      >
        Start
      </button>
    </QuizPageBody>
  );
}

const QuizPageBody = styled.section`
  margin: 100px 10px;

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
