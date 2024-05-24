import { useEffect, useState } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import Quiz from "./quiz/Quiz";
import QuizBox from "./quiz/QuizBox";
import { useQuiz } from "./context/QuizContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const { getAllQuizzes } = useQuiz();

  useEffect(function () {
    async function getData() {
      const data = await getAllQuizzes();
      setQuizzes(data);
    }

    getData();
  }, []);

  return (
    <>
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Quiz />} />
          </Route>
          {/* <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
