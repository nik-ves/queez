import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";
import styled from "styled-components";
import QuestionBox from "../question/QuestionBox";
import AnswerBox from "../answer/AnswerBox";

import { isObjectEmpty } from "../../utils/helpers";
import Spinner from "../ui/Spinner";

export default function QuizStarted() {
  const { quizId, questionId } = useParams();
  const {
    questionAndAnswers,
    getQuestionAndAnswers,
    questionsIds,
    setQuestionAndAnswers,
    questionIndex,
    changeQuestion,
    finishQuiz,
    preventAnswer,
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

  if (questionAndAnswers && isObjectEmpty(questionAndAnswers)) {
    return <Spinner />;
  } else {
    return (
      <QuizBody>
        {questionAndAnswers && (
          <QuestionBox
            question={questionAndAnswers}
            questionNumber={questionIndex}
          />
        )}

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
                preventAnswer
              }
              onClick={() => {
                changeQuestion(quizId, "-");
              }}
            >
              Previous
            </button>

            <button
              disabled={questionsIds.length === 0 || preventAnswer}
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
