import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import QuizList from "./components/quiz/QuizList";
import QuizPage from "./components/quiz/QuizPage";
import QuizStarted from "./components/quiz/QuizStarted";
import QuizResult from "./components/quiz/QuizResult";
import { useQuiz } from "./context/QuizContext";
import AppLayout from "./components/ui/AppLayout";
import ScrollToTop from "./components/ui/ScrollToTop";

function App() {
  const { quizzes, isLoading, getAllQuizzes } = useQuiz();

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
          <Route
            index
            element={
              quizzes.length === 0 && !isLoading ? (
                <Navigate to="/" replace />
              ) : (
                <QuizList />
              )
            }
          />

          <Route path="quizId/:quizId" element={<QuizPage />} />
          <Route
            path="/quizId/:quizId/questionId/:questionId"
            element={<QuizStarted />}
          />
          <Route path="/result" element={<QuizResult />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
