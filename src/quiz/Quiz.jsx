import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useQuiz } from "../context/QuizContext";
import styled from "styled-components";

export default function Quiz() {
  const { quizzes, getAllQuizzes } = useQuiz();

  useEffect(() => {
    async function getQuizList() {
      await getAllQuizzes();
    }

    getQuizList();
  }, []);

  return (
    <QuizBody>
      {quizzes?.map((quiz, i) => {
        return (
          <StyledLink key={i} to={`quizId/${quiz.id}`}>
            <Title>{quiz.title}</Title>
          </StyledLink>
        );
      })}
    </QuizBody>
  );
}

const QuizBody = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 10px;
`;

const StyledLink = styled(Link)`
  width: 45%;
  border: 1px solid white;
  padding: 10px;
`;

const Title = styled.p`
  color: white;
  font-size: 30px;
  line-height: 1;
  max-width: 100%;
  text-align: center;
`;
