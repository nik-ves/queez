import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuiz } from "../../context/QuizContext";
import { useEffect } from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function QuizPage() {
  const { quizId } = useParams();
  const { quizzes, startQuiz, shuffle, setShuffle } = useQuiz();

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

      <StyledFormGroup>
        <FormControlLabel
          sx={{
            color: "white",
          }}
          control={
            <Switch
              checked={shuffle}
              onChange={() => {
                setShuffle(!shuffle);
              }}
            />
          }
          label="Shuffle questions"
        />
      </StyledFormGroup>

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

const StyledFormGroup = styled(FormGroup)`
  font-style: inherit;
  color: "white";
  margin-bottom: 10px;
`;

const StyledSwitch = styled(Switch)`
  font-style: inherit;
  color: "white";
  margin-bottom: 10px;
`;
