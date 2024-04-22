import { useEffect, useMemo, useState } from "react";
import QuestionBox from "../question/QuestionBox";
import AnswerBox from "../answer/AnswerBox";
import { getQuestion } from "../services/apiQuestions";
import { shuffleArray } from "../utils/helpers";
import styled from "styled-components";

export default function Quiz({ activeQuiz, onQuizEnd }) {
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState();
  const [questionIds] = useState(activeQuiz.questionIds);
  const [isLoading, setIsLoading] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);

  const randomizedQuestions = useMemo(
    () => shuffleArray(questionIds),
    [questionIds]
  );

  async function getData() {
    let arrayElement = randomizedQuestions[questionNumber];

    if (arrayElement && arrayElement?.id !== 0) {
      try {
        setIsLoading(true);

        const { data, error } = await getQuestion(
          activeQuiz.quizId,
          arrayElement?.id
        );

        setQuestion(data);
        setAnswers(data?.answer);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      onQuizEnd({});
      setQuestion(null);
      setAnswers(null);
    }
  }

  useEffect(
    function () {
      getData();
    },
    [questionNumber]
  );

  return (
    <>
      {question && (
        <QuestionBox question={question} questionNumber={questionNumber + 1} />
      )}

      {answers && (
        <AnswerBox
          answers={answers}
          type={question?.answerType}
          correctAnswers={question?.numOfCorrectAnswers}
        />
      )}

      {question && (
        <Actions>
          <button
            disabled={isLoading || questionNumber === 0}
            onClick={() => {
              setQuestionNumber((value) => value - 1);
            }}
          >
            {isLoading ? "Loading..." : "Previous"}
          </button>

          <button
            disabled={isLoading || questionNumber + 1 === questionIds?.length}
            onClick={() => {
              setQuestionNumber((value) => value + 1);
            }}
          >
            {isLoading ? "Loading..." : "Next"}
          </button>
        </Actions>
      )}
    </>
  );
}

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;
