import { useState } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import Question from "./question/Question";
import Answer from "./answer/Answer";
import supabase from "./services/supabase";

function App() {
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [questionDetails, setQuestionDetails] = useState([]);

  async function test() {
    const { data, error } = await supabase
      .from("question")
      .select(
        `
        id, 
        type, 
        answer ( id, text, result ),
        question_details ( id, header, text )
        `
      )
      .eq("quiz_id", "1");

    setQuestion(data[0]);
    setAnswers(data[0].answer);
    setQuestionDetails(data[0].question_details);
  }

  console.log(answers);

  return (
    <>
      <GlobalStyles />

      {!question && (
        <button
          onClick={() => {
            test();
          }}
        >
          Start
        </button>
      )}

      {questionDetails.map((details, idx) => {
        return <Question key={idx} details={details} type={question.type} />;
      })}

      {answers.map((answerObject, idx) => {
        return <Answer key={idx} answer={answerObject} />;
      })}

      {question && (
        <button
          onClick={() => {
            test();
          }}
        >
          Next
        </button>
      )}
    </>
  );
}

export default App;
