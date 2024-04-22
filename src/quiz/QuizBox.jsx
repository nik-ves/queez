import styled from "styled-components";
import { getAllQuestionsId } from "../services/apiQuestions";

export default function QuizBox({ quiz, onQuizStart }) {
  async function startQuiz() {
    const { data } = await getAllQuestionsId(quiz.id);

    onQuizStart({
      quizId: quiz.id,
      questionIds: data,
    });
  }

  return (
    <QuizBody>
      <p>{quiz?.title}</p>

      <button onClick={startQuiz}>Start</button>
    </QuizBody>
  );
}

const QuizBody = styled.div`
  width: 800px;
  max-width: 100%;
  padding: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid white;

  & p {
    font-size: 35px;
    margin: 0;
    color: white;
  }
`;
