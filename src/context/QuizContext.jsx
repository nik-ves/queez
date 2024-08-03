import { createContext, useContext, useState } from "react";
import supabase from "../services/supabase";
import { shuffleArray } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const QuizContext = createContext();

function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState([]);
  const [questionAndAnswers, setQuestionAndAnswers] = useState([]);
  const [questionsIds, setQuestionsIds] = useState([]);

  const navigate = useNavigate();

  async function getAllQuizzes() {
    try {
      const { data, error } = await supabase
        .from("quiz")
        .select("id, title, description");

      if (error) throw new Error(error);

      setQuizzes(data);
    } catch (error) {
      confirm("There was an error loading data. Try again later.");
      navigate("/");
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

      if (error) throw new Error(error);

      setQuestionAndAnswers(data);
    } catch (error) {
      confirm("There was an error loading data. Try again later.");
      navigate("/");
    }
  }

  async function getAllQuestionsIds(quizId) {
    try {
      const { data, error } = await supabase
        .from("get_all_question_ids")
        .select(`id, quizId`)
        .eq("quizId", quizId);

      if (error) throw new Error(error);

      const shuffled = shuffleArray(data);

      // const slicedArray = data.slice(0, 5);
      // console.log(slicedArray);

      setQuestionsIds(shuffled);
    } catch (error) {
      confirm("There was an error loading data. Try again later.");
      navigate("/");
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
