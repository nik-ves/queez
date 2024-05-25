import { createContext, useContext, useState } from "react";
import supabase from "../services/supabase";
import { shuffleArray } from "../utils/helpers";

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState([]);
  const [questionAndAnswers, setQuestionAndAnswers] = useState([]);
  const [questionsIds, setQuestionsIds] = useState([]);

  async function getAllQuizzes() {
    try {
      const { data, error } = await supabase
        .from("quiz")
        .select("id, title, description");

      setQuizzes(data);
    } catch (error) {
      alert("There was an error loading data");
    }
  }

  async function getQuestionAndAnswers(quizId, questionId) {
    try {
      const { data, error } = await supabase
        .from("question")
        .select(
          `
          answerType,
          numOfCorrectAnswers,
          text,
          image,
          id,
          answer ( * )
          `
        )
        .eq("quizId", quizId)
        .eq("id", questionId)
        .limit(1)
        .single();

      setQuestionAndAnswers(data);
    } catch (error) {
      alert("There was an error loading data");
    }
  }

  async function getAllQuestionsIds(quizId) {
    try {
      // if (questionsIds.length > 0) setQuestionsIds([]);

      const { data, error } = await supabase
        .from("get_all_question_ids")
        .select(`id, quizId`)
        .eq("quizId", quizId);

      const shuffled = shuffleArray(data);

      setQuestionsIds(shuffled);
    } catch (error) {
      alert("There was an error loading data");
    }
  }

  const exports = {
    quizzes,
    getAllQuizzes,
    questionsIds,
    getAllQuestionsIds,
    questionAndAnswers,
    getQuestionAndAnswers,
    setQuestionAndAnswers,
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
