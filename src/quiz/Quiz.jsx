import { useEffect, useMemo, useState } from "react";
import QuestionBox from "../question/QuestionBox";
import AnswerBox from "../answer/AnswerBox";
import { getQuestion } from "../services/apiQuestions";
import { shuffleArray } from "../utils/helpers";
import styled from "styled-components";

import { useQuiz } from "../context/QuizContext";

export default function Quiz({ activeQuiz, onQuizEnd }) {
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState();
  const [questionNumber, setQuestionNumber] = useState(0);
  const { quizData, getQuizData } = useQuiz();

  const randomizedQuestions = useMemo(() => shuffleArray(quizData), [quizData]);

  function getQuestion() {
    let question = randomizedQuestions[questionNumber];

    setQuestion(question);
    setAnswers(question?.answer);
  }

  useEffect(function () {
    async function getData() {
      await getQuizData(activeQuiz);
    }

    getData();
  }, []);

  console.log(question);

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
            disabled={questionNumber === 0}
            onClick={() => {
              setQuestionNumber((value) => value - 1);
              getQuestion();
            }}
          >
            Previous
          </button>

          <button
            disabled={questionNumber + 1 === quizData?.length}
            onClick={() => {
              setQuestionNumber((value) => value + 1);
              getQuestion();
            }}
          >
            Next
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
