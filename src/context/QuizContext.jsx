import { createContext, useContext, useState } from "react";
import supabase from "../services/supabase";

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllQuizzes() {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("quiz").select("id, title");

      setQuizzes(data);
    } catch (error) {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  async function getQuizData(quizId) {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("question")
        .select(
          `
          answerType,
          numOfCorrectAnswers,
          text,
          image,
          answer ( * )
          `
        )
        .eq("quizId", quizId);

      setQuestionsAndAnswers(data);
    } catch (error) {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  const exports = {
    quizzes,
    getAllQuizzes,
    quizData: questionsAndAnswers,
    getQuizData,
    isLoading,
  };

  return (
    <QuizContext.Provider value={exports}>{children}</QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined) throw new Error("You can't use context here!");

  return context;
}

export { QuizProvider, useQuiz };
