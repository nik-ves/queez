import { useEffect } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import Quiz from "./quiz/Quiz";
import QuizPage from "./quiz/QuizPage";
import QuizStarted from "./quiz/QuizStarted";
import { useQuiz } from "./context/QuizContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";

function App() {
  const { getAllQuizzes, setQuestionAndAnswers } = useQuiz();

  useEffect(function () {
    async function getData() {
      await getAllQuizzes();
    }

    getData();
    setQuestionAndAnswers([]);
  }, []);

  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Quiz />} />
            <Route path="quizId/:quizId" element={<QuizPage />} />
            <Route
              path="/quizId/:quizId/questionId/:questionId"
              element={<QuizStarted />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
