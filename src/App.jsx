import { useEffect, useState } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import QuestionBox from "./question/QuestionBox";
import AnswerBox from "./answer/AnswerBox";

import { getAllQuestionsId, getQuestonById } from "./services/apiQuestions";

function App() {
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState();
  const [questionDetails, setQuestionDetails] = useState();
  const [questionsId, setQuestionsId] = useState([]);
  const correctAnswers = questionDetails
    ? questionDetails[0]?.correctAnswers
    : 0;

  async function getQuestion() {
    let randomElement =
      questionsId[Math.floor(Math.random() * questionsId.length)];

    if (randomElement) {
      const { data, error } = await getQuestonById(randomElement.id);

      setQuestion(data);
      setQuestionDetails(data?.question_details);
      setAnswers(data?.answer);
    } else {
      setQuestion(null);
      setQuestionDetails(null);
      setAnswers(null);
    }

    setQuestionsId((prevState) => {
      return prevState.filter((id) => id !== randomElement);
    });
  }

  useEffect(function () {
    async function getIds() {
      const data = await getAllQuestionsId();
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

      <QuestionBox details={questionDetails} type={question?.answerType} />

      <AnswerBox
        answers={answers}
        type={question?.answerType}
        correctAnswers={correctAnswers}
      />

      {question && (
        <button
          onClick={() => {
            getQuestion();
          }}
        >
          Next
        </button>
      )}
    </>
  );
}

export default App;
