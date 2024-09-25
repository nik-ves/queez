import { useQuiz } from "../../context/QuizContext";

export default function QuizResult() {
  const { quizResult } = useQuiz();

  const { correct: correctSingle, incorrect: incorrectSingle } =
    quizResult.single;
  const { correct: correctMultiple, incorrect: incorrectMultiple } =
    quizResult.multiple;
  const { correct: correctDragdrop, incorrect: incorrectDragdrop } =
    quizResult.dragdrop;
  const { correct: correctDropdown, incorrect: incorrectDropdown } =
    quizResult.dropdown;

  const setCorrectMultiple = new Set(
    correctMultiple.map((answer) => {
      return answer.questionId;
    })
  );

  const setIncorrectMultiple = new Set(
    incorrectMultiple.map((answer) => {
      return answer.questionId;
    })
  );

  const setCorrectDragdrop = new Set(
    correctDragdrop.map((answer) => {
      return answer.questionId;
    })
  );

  const setIncorrectDragdrop = new Set(
    incorrectDragdrop.map((answer) => {
      return answer.questionId;
    })
  );

  const setCorrectDropdown = new Set(
    correctDropdown.map((answer) => {
      return answer.questionId;
    })
  );

  const setIncorrectDropdown = new Set(
    incorrectDropdown.map((answer) => {
      return answer.questionId;
    })
  );

  console.log(quizResult);

  return (
    <div>
      <h1>single correct</h1>
      {correctSingle?.map((answer, idx) => {
        return <p key={idx}>{answer?.questionId}</p>;
      })}
      <h1>single incorrect</h1>
      {Array.from(incorrectSingle).map((answer, idx) => {
        return <p key={idx}>{answer?.questionId}</p>;
      })}
      <h1>multiple correct</h1>
      {Array.from(setCorrectMultiple).map((answer, idx) => {
        return <p key={idx}>{answer}</p>;
      })}
      <h1>multiple incorrect</h1>
      {Array.from(setIncorrectMultiple).map((answer, idx) => {
        return <p key={idx}>{answer}</p>;
      })}
      <h1>dragdrop correct</h1>
      {Array.from(setCorrectDragdrop).map((answer, idx) => {
        return <p key={idx}>{answer}</p>;
      })}
      <h1>dragdrop incorrect</h1>
      {Array.from(setIncorrectDragdrop).map((answer, idx) => {
        return <p key={idx}>{answer}</p>;
      })}
      <h1>dropdown correct</h1>
      {Array.from(setCorrectDropdown).map((answer, idx) => {
        return <p key={idx}>{answer}</p>;
      })}
      <h1>dropdown incorrect</h1>
      {Array.from(setIncorrectDropdown).map((answer, idx) => {
        return <p key={idx}>{answer}</p>;
      })}
    </div>
  );
}
