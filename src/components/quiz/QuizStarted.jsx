import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";
import styled from "styled-components";
import QuestionBox from "../question/QuestionBox";
import AnswerBox from "../answer/AnswerBox";
import QuizReview from "./QuizReview";

import { isObjectEmpty } from "../../utils/helpers";
import Spinner from "../ui/Spinner";

export default function QuizStarted() {
  const { quizId, questionId } = useParams();
  const {
    questionAndAnswers,
    getQuestionAndAnswers,
    questionsIds,
    setQuestionAndAnswers,
    changeQuestion,
    finishQuiz,
    preventAnswer,
    incorrectQuestions,
  } = useQuiz();

  const firstQuestionId = questionsIds[0]?.id;
  const lastQuestionId = questionsIds[questionsIds?.length - 1]?.id;

  useEffect(() => {
    async function getData() {
      await getQuestionAndAnswers(quizId, questionId);
    }

    if (
      (quizId !== undefined && questionId !== undefined) ||
      questionsIds.length > 0
    ) {
      getData();
    }

    return () => {
      setQuestionAndAnswers([]);
    };
  }, [quizId, questionId]);

  const loading = questionAndAnswers && isObjectEmpty(questionAndAnswers);

  return (
    <>
      {incorrectQuestions.length > 0 ? <QuizReview /> : null}

      {loading === true ? (
        <Spinner />
      ) : (
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
                disabled={
                  firstQuestionId == questionId ||
                  questionsIds.length === 0 ||
                  preventAnswer ||
                  incorrectQuestions?.length > 0
                }
                onClick={() => {
                  changeQuestion(quizId, "-");
                }}
              >
                Previous
              </button>

              <button
                disabled={
                  questionsIds.length === 0 ||
                  preventAnswer ||
                  incorrectQuestions?.length > 0
                }
                onClick={() => {
                  if (questionId != lastQuestionId) {
                    changeQuestion(quizId, "+");
                  } else {
                    finishQuiz();
                  }
                }}
              >
                {questionId == lastQuestionId ? "Finish" : "Next"}
              </button>
            </Actions>
          )}
        </QuizBody>
      )}
    </>
  );
}

const QuizBody = styled.section`
  margin: 50px 10px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;
