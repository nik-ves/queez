import { useEffect, useState } from "react";

import { useQuiz } from "../context/QuizContext";
import styled from "styled-components";

export default function Quiz() {
  const [quizzes, setQuizzes] = useState([]);

  const { getAllQuizzes } = useQuiz();

  useEffect(() => {
    async function getQuizList() {
      const data = await getAllQuizzes();
      setQuizzes(data);
    }

    getQuizList();
  }, []);

  console.log(quizzes);

  return (
    <>
      {quizzes?.map((quiz, i) => (
        <QuizBody key={i}>
          <Box>
            <Title>{quiz.title}</Title>
          </Box>
        </QuizBody>
      ))}
    </>
  );
}

const QuizBody = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const Box = styled.div`
  width: 100%;
  border: 1px solid white;
  padding: 10px;
`;

const Title = styled.p`
  color: white;
  font-size: 40px;
  line-height: 1;
  max-width: 100%;
`;
