import { useQuiz } from "../context/QuizContext";
import { equalArrays, equalArraysDragDrop } from "../utils/helpers";

let passedAnswers = [];

export function useQuizResult() {
  const { quizResult, setQuizResult, preventAnswer, setPreventAnswer } =
    useQuiz();

  function answerSingle(_answer) {
    setQuizResult((oldState) => {
      let { correct: newCorrect, incorrect: newIncorrect } = oldState.single;

      if (
        newCorrect.find((data) => data.questionId === _answer.questionId) ||
        newIncorrect.find((data) => data.questionId === _answer.questionId)
      ) {
        return oldState;
      }

      if (_answer.isCorrect === true) {
        newCorrect = [...newCorrect, _answer];
      } else {
        newIncorrect = [...newIncorrect, _answer];
      }

      setPreventAnswer(false);

      passedAnswers = [];
      return {
        ...oldState,
        single: {
          correct: newCorrect,
          incorrect: newIncorrect,
        },
      };
    });
  }

  function answerMultiple(_answer, _correctAnswers) {
    setQuizResult((oldState) => {
      let { correct: newCorrect, incorrect: newIncorrect } = oldState.multiple;

      passedAnswers = [...passedAnswers, _answer];

      if (passedAnswers.length === _correctAnswers.length) {
        const areAnswersCorrect = passedAnswers.every(
          (answer) => answer.isCorrect === true
        );

        if (areAnswersCorrect === true) {
          newCorrect = [...newCorrect, ...passedAnswers];
        } else {
          newIncorrect = [...newIncorrect, ...passedAnswers];
        }

        setPreventAnswer(false);

        passedAnswers = [];
        return {
          ...oldState,
          multiple: {
            correct: newCorrect,
            incorrect: newIncorrect,
          },
        };
      } else {
        return oldState;
      }
    });
  }

  function answerDropdown(_answer, _correctAnswers) {
    setQuizResult((oldState) => {
      let { correct: newCorrect, incorrect: newIncorrect } = oldState.dropdown;
      let duplicate = passedAnswers.find((item) => item.id === _answer.id);

      if (duplicate) {
        let filteredDuplicate = passedAnswers.map((obj) =>
          obj.id === duplicate.id
            ? {
                ...obj,
                option: _answer.option,
              }
            : obj
        );
        passedAnswers = filteredDuplicate;
      } else {
        passedAnswers = [...passedAnswers, _answer];
      }

      if (passedAnswers.length === _correctAnswers.length) {
        const areAnswersCorrect = equalArrays(
          passedAnswers.map((answer) => {
            return { questionId: answer.questionId, option: answer.option };
          }),
          _correctAnswers.map((answer) => {
            return { questionId: answer.questionId, option: answer.option };
          }),
          true
        );

        if (areAnswersCorrect === true) {
          newCorrect = [...newCorrect, ...passedAnswers];
        } else {
          newIncorrect = [...newIncorrect, ...passedAnswers];
        }

        setPreventAnswer(false);

        passedAnswers = [];
        return {
          ...oldState,
          dropdown: {
            correct: newCorrect,
            incorrect: newIncorrect,
          },
        };
      } else {
        return oldState;
      }
    });
  }

  function answerDragDrop(_answer, _correctAnswers, correctAnswers) {
    setQuizResult((oldState) => {
      let { correct: newCorrect, incorrect: newIncorrect } = oldState.dragdrop;
      let duplicate = passedAnswers.find((item) => item.id === _answer.id);

      if (duplicate) {
        let filteredDuplicate = passedAnswers.map((obj) =>
          obj.id === duplicate.id
            ? {
                ...obj,
                text: _answer.text,
              }
            : obj
        );
        passedAnswers = filteredDuplicate;
      } else {
        passedAnswers = [...passedAnswers, _answer];
      }

      if (passedAnswers.length === correctAnswers) {
        const areAnswersCorrect = equalArraysDragDrop(
          passedAnswers.map((answer) => {
            return {
              correctArrayPlace: answer.correctArrayPlace,
              text: answer.text,
              questionId: answer.questionId,
            };
          }),
          _correctAnswers.splice(0, correctAnswers).map((answer) => {
            return {
              correctArrayPlace: answer.correctArrayPlace,
              text: answer.text,
              questionId: answer.questionId,
            };
          }),
          true
        );

        if (areAnswersCorrect === true) {
          newCorrect = [...newCorrect, ...passedAnswers];
        } else {
          newIncorrect = [...newIncorrect, ...passedAnswers];
        }

        setPreventAnswer(false);

        passedAnswers = [];
        return {
          ...oldState,
          dragdrop: {
            correct: newCorrect,
            incorrect: newIncorrect,
          },
        };
      } else {
        return oldState;
      }
    });
  }

  return {
    quizResult,
    preventAnswer,
    setPreventAnswer,
    answerSingle,
    answerMultiple,
    answerDropdown,
    answerDragDrop,
  };
}
