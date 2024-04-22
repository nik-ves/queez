import { useEffect, useState } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import Quiz from "./quiz/Quiz";
import QuizBox from "./quiz/QuizBox";
import { getAllQuizzes } from "./services/apiQuizzes";
import supabase from "./services/supabase";

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

  // async function getQuizData() {
  //   const { data, error } = await supabase.from("question").select(
  //     `
  //     answerType,
  //     numOfCorrectAnswers,
  //     text,
  //     image,
  //     answer ( * )
  //     `
  //   );

  //   console.log("test");
  //   console.log(data, error);
  //   console.log("test2");
  // }

  return (
    <>
      <GlobalStyles />

      {/* <button
        onClick={() => {
          getQuizData();
        }}
      >
        Test
      </button> */}

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
