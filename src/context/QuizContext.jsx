import { createContext, useContext, useState } from "react";
import supabase from "../services/supabase";
import { shuffleArray } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const QuizContext = createContext();

let questIds = [];

function QuizProvider({ children }) {
  const [quizzes, setQuizzes] = useState([]);
  const [questionAndAnswers, setQuestionAndAnswers] = useState([]);
  const [shuffle, setShuffle] = useState(true);
  const [questionsIds, setQuestionsIds] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [preventAnswer, setPreventAnswer] = useState(true);
  const [quizResult, setQuizResult] = useState({
    single: {
      correct: [],
      incorrect: [],
    },
    multiple: {
      correct: [],
      incorrect: [],
    },
    dragdrop: {
      correct: [],
      incorrect: [],
    },
    dropdown: {
      correct: [],
      incorrect: [],
    },
  });

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

  async function getQuestionAndAnswers(_quizId, _questionId) {
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
        .eq("quizId", _quizId)
        .eq("id", _questionId)
        .limit(1)
        .single();

      if (error) throw new Error(error);

      setQuestionAndAnswers(data);
    } catch (error) {
      confirm("There was an error loading data. Try again later.");
      navigate("/");
    }
  }

  async function getAllQuestionsIds(_quizId) {
    try {
      const { data, error } = await supabase
        .from("get_all_question_ids")
        .select(`id, quizId`)
        .eq("quizId", _quizId);

      if (error) throw new Error(error);

      // if (shuffle) {
      //   return shuffleArray(data);
      // } else {
      //   return data;
      // }

      return data.slice(6, 10);
    } catch (error) {
      confirm("There was an error loading data. Try again later.");
      navigate("/");
    }
  }

  async function startQuiz(_quizId) {
    questIds = await getAllQuestionsIds(_quizId);
    setQuestionsIds(questIds);

    navigate(`/quizId/${_quizId}/questionId/${questIds[questionIndex]?.id}`);
  }

  function finishQuiz() {
    resetQuiz();

    navigate("/result");
  }

  function resetQuiz() {
    questIds = [];
    setQuestionsIds(questIds);
    setQuestionIndex(0);
    setQuizResult({
      single: {
        correct: [],
        incorrect: [],
      },
      multiple: {
        correct: [],
        incorrect: [],
      },
      dragdrop: {
        correct: [],
        incorrect: [],
      },
      dropdown: {
        correct: [],
        incorrect: [],
      },
    });
  }

  function changeQuestion(_quizId, _direction) {
    switch (_direction) {
      case "-":
        setQuestionIndex((oldValue) => {
          if (oldValue === -1) {
            navigate(`/quizId/${_quizId}/questionId/${questIds[oldValue]?.id}`);
            return oldValue;
          } else {
            navigate(
              `/quizId/${_quizId}/questionId/${questIds[oldValue - 1]?.id}`
            );

            return oldValue - 1;
          }
        });
        break;

      case "+":
        setQuestionIndex((oldValue) => {
          navigate(
            `/quizId/${_quizId}/questionId/${questIds[oldValue + 1]?.id}`
          );
          return oldValue + 1;
        });
        break;
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
    startQuiz,
    questionIndex,
    changeQuestion,
    setQuestionIndex,
    shuffle,
    setShuffle,
    quizResult,
    setQuizResult,
    finishQuiz,
    preventAnswer,
    setPreventAnswer,
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
