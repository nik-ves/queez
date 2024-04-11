import { useState } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import Question from "./question/Question";
import Answer from "./answer/Answer";
import supabase from "./services/supabase";

function App() {
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [questionDetails, setQuestionDetails] = useState([]);
  const [testInput, setTestInput] = useState("");

  async function test() {
    const { data, error } = await supabase
      .from("question")
      .select(
        `
        id, 
        type, 
        text,
        answer ( id, text, result ),
        question_details ( id, header, text )
        `
      )
      .eq("quiz_id", "1");

    setQuestion(data[0]);
    setAnswers(data[0].answer);
    setQuestionDetails(data[0].question_details);
  }

  // console.log(question);

  let str = question?.text;
  const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
  let jaja = str?.replace(regex, "<br>");
  console.log(jaja);

  // const testara = testInput?.replace(/\n\r/g, "\r\n\r\n");

  // const testara = str?.replace(/\n\r/g, "\r\n\r\n");
  // console.log(testara);

  // var lines = testInput?.split("\r\n\r\n");
  // console.log(lines);

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

      <code>{question?.text}</code>

      {/* <textarea
        onChange={(event) => setTestInput(event.target.value)}
      ></textarea> */}
    </>
  );
}

export default App;
