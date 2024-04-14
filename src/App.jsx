import { useEffect, useState } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import QuestionBox from "./question/QuestionBox";
import AnswerBox from "./answer/AnswerBox";

import { getAllQuestionsId, getQuestonById } from "./services/apiQuestions";

function App() {
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState();
  const [questionsId, setQuestionsId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const correctAnswers = question ? question?.numOfCorrectAnswers : 0;

  async function getQuestion() {
    let randomElement =
      questionsId[Math.floor(Math.random() * questionsId.length)];

    if (randomElement) {
      try {
        setIsLoading(true);

        const { data, error } = await getQuestonById(randomElement.id);
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

    setQuestionsId((prevState) => {
      return prevState.filter((id) => id !== randomElement);
    });
  }

  useEffect(function () {
    async function getIds() {
      const { data } = await getAllQuestionsId();
      setQuestionsId(data);
    }

    getIds();
  }, []);

  return (
    <>
      <GlobalStyles />

      {!question && (
        <button
          onClick={() => {
            getQuestion();
          }}
        >
          Start
        </button>
      )}

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
            getQuestion();
          }}
        >
          {isLoading ? "Loading..." : "Next"}
        </button>
      )}
    </>
  );
}

export default App;
