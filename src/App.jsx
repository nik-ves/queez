import { useEffect, useState } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import Quiz from "./quiz/Quiz";
import QuizBox from "./quiz/QuizBox";
import { useQuiz } from "./context/QuizContext";

function App() {
  const [activeQuiz, setActiveQuiz] = useState();
  const { quizzes, getAllQuizzes } = useQuiz();

  useEffect(function () {
    async function getData() {
      await getAllQuizzes();
    }

    getData();
  }, []);

  return (
    <>
      <GlobalStyles />

      {!activeQuiz && (
        <>
          {quizzes.map((quiz, idx) => {
            return (
              <QuizBox onQuizStart={setActiveQuiz} key={idx} quiz={quiz} />
            );
          })}
        </>
      )}

      {activeQuiz ? (
        <Quiz activeQuiz={activeQuiz} onQuizEnd={setActiveQuiz} />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
