import styled from "styled-components";
import { useQuiz } from "../../context/QuizContext";
import { Link } from "react-router-dom";

export default function QuizReview() {
  const { incorrectQuestions, quizStatus, startQuiz } = useQuiz();

  return (
    <Body>
      <Content>
        <button
          onClick={() => {
            startQuiz(quizStatus?.quizId);
          }}
        >
          Start again
        </button>

        <h3>Incorrect answers</h3>

        <ul>
          {incorrectQuestions.map((question, idx) => {
            return (
              <li key={idx}>
                <Link
                  to={`/quizId/${quizStatus?.quizId}/questionId/${question}`}
                >
                  {question}
                </Link>
              </li>
            );
          })}
        </ul>
      </Content>
    </Body>
  );
}

const Body = styled.div`
  width: 200px;
  height: 100%;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: scroll;
  border-right: 3px solid white;

  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  & h3 {
    text-align: center;
    color: white;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ul {
    list-style: none;
    margin: 10px 0;
    padding: 0;
    text-align: center;

    display: flex;
    flex-direction: column;
    gap: 10px;
    color: white;
  }
`;
