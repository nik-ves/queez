import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import styled from "styled-components";
import QuestionBox from "../question/QuestionBox";
import AnswerBox from "../answer/AnswerBox";

import { isObjectEmpty } from "../utils/helpers";
import Spinner from "../ui/Spinner";

export default function QuizStarted() {
  const { quizId, questionId } = useParams();
  const {
    getQuestionAndAnswers,
    questionAndAnswers,
    questionsIds,
    setQuestionAndAnswers,
  } = useQuiz();
  const [questionIndex, setQuestionIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      await getQuestionAndAnswers(quizId, questionId);
    }

    if (quizId && questionId) getData();

    return () => {
      setQuestionAndAnswers([]);
    };
  }, [quizId, questionId]);

  useEffect(() => {
    if (questionsIds.length !== 0) {
      navigate(
        `/quizId/${quizId}/questionId/${questionsIds[questionIndex]?.id}`
      );
    }
  }, [questionIndex]);

  console.log(questionId);

  if (questionAndAnswers && isObjectEmpty(questionAndAnswers)) {
    return <Spinner />;
  } else {
    return (
      <QuizBody>
        {questionAndAnswers && <QuestionBox question={questionAndAnswers} />}

        {questionAndAnswers && (
          <AnswerBox
            answers={questionAndAnswers?.answer}
            type={questionAndAnswers?.answerType}
            correctAnswers={questionAndAnswers?.numOfCorrectAnswers}
          />
        )}

        {questionAndAnswers && (
          <Actions>
            <button
              disabled={questionIndex === 0 || questionsIds.length === 0}
              onClick={() => {
                setQuestionIndex((value) => value - 1);
              }}
            >
              Previous
            </button>

            <button
              disabled={
                questionIndex + 1 === questionIndex?.length ||
                questionsIds.length === 0
              }
              onClick={() => {
                setQuestionIndex((value) => value + 1);
              }}
            >
              Next
            </button>
          </Actions>
        )}
      </QuizBody>
    );
  }
}

const QuizBody = styled.section`
  margin: 100px 10px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;
