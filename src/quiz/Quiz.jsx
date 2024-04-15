import { useEffect, useState } from "react";
import QuestionBox from "../question/QuestionBox";
import AnswerBox from "../answer/AnswerBox";
import { getQuestion } from "../services/apiQuestions";

export default function Quiz({ activeQuiz, onQuizEnd }) {
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState();
  const [questionIds, setQuestionIds] = useState(activeQuiz.questionIds);
  const [isLoading, setIsLoading] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const correctAnswers = question ? question?.numOfCorrectAnswers : 0;

  async function getData() {
    let arrayElement =
      questionIds[Math.floor(Math.random() * questionIds?.length)];

    if (arrayElement.id) {
      try {
        setIsLoading(true);

        const { data, error } = await getQuestion(
          activeQuiz.quizId,
          arrayElement.id
        );
        setQuestion(data);
        setAnswers(data?.answer);
        setQuestionNumber((oldValue) => oldValue + 1);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setQuestion(null);
      setAnswers(null);
      setQuestionNumber(0);
    }

    setQuestionIds((prevState) => {
      return prevState.filter((id) => id !== arrayElement);
    });
  }

  useEffect(function () {
    getData();

    return () => {
      onQuizEnd({});
      setQuestionNumber(0);
    };
  }, []);

  return (
    <>
      {question && (
        <QuestionBox question={question} questionNumber={questionNumber} />
      )}

      {answers && (
        <AnswerBox
          answers={answers}
          type={question?.answerType}
          correctAnswers={correctAnswers}
        />
      )}

      {question && (
        <button
          disabled={isLoading}
          onClick={() => {
            getData();
          }}
        >
          {isLoading ? "Loading..." : "Next"}
        </button>
      )}
    </>
  );
}
