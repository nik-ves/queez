import { useEffect, useState } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import Quiz from "./quiz/Quiz";
import QuizBox from "./quiz/QuizBox";
import { getAllQuizzes } from "./services/apiQuizzes";

function App() {
  const [activeQuiz, setActiveQuiz] = useState({});
  const [quizzes, setQuizzes] = useState([]);

  useEffect(function () {
    async function getData() {
      const { data } = await getAllQuizzes();

      setQuizzes(data);
    }

    getData();
  }, []);

  return (
    <>
      <GlobalStyles />

      {!activeQuiz.quizId && (
        <>
          {quizzes.map((quiz, idx) => {
            return (
              <QuizBox onQuizStart={setActiveQuiz} key={idx} quiz={quiz} />
            );
          })}
        </>
      )}

      {activeQuiz.quizId ? (
        <Quiz activeQuiz={activeQuiz} onQuizEnd={setActiveQuiz} />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
