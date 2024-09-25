import { Link } from "react-router-dom";
import styled from "styled-components";

import Spinner from "../ui/Spinner";
import { useQuiz } from "../../context/QuizContext";

export default function QuizList() {
  const { quizzes } = useQuiz();

  if (quizzes.length === 0) {
    return <Spinner />;
  } else {
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
  background-color: #535bf2;
`;

const Title = styled.p`
  color: white;
  font-size: 30px;
  line-height: 1;
  max-width: 100%;
  text-align: center;
`;
