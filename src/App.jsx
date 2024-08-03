import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Quiz from "./components/quiz/Quiz";
import QuizPage from "./components/quiz/QuizPage";
import QuizStarted from "./components/quiz/QuizStarted";
import { useQuiz } from "./context/QuizContext";
import AppLayout from "./components/ui/AppLayout";
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  const { getAllQuizzes } = useQuiz();

  useEffect(function () {
    async function getData() {
      await getAllQuizzes();
    }

    getData();
  }, []);

  return (
    <>
      <GlobalStyles />

      <ScrollToTop />

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
    </>
  );
}

export default App;
