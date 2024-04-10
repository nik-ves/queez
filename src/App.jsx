import { useState } from "react";
import "./App.css";

import supabase from "./services/supabase";

function App() {
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [questionDetails, setQuestionDetails] = useState([]);

  async function test() {
    // const { data, error } = await supabase.from("question").select(`
    //   id,
    //   text,
    //   answer ( id, text, isCorrect )
    // `);

    // let { data, error } = await supabase.from("question_details").select("*");

    const { data, error } = await supabase
      .from("question")
      .select(
        `
    id, 
    type, 
    answer ( id, text, isCorrect ),
    question_details ( id, header, text )
    `
      )
      .eq("quiz_id", "1");

    setQuestion(data[0]);
    setAnswers(data[0].answer);
    setQuestionDetails(data[0].question_details);
  }

  console.log(questionDetails);

  return (
    <>
      <p>Nikola</p>

      <button
        onClick={() => {
          test();
        }}
      >
        Test
      </button>
      {questionDetails.map((detail) => {
        const text = detail.text;

        return (
          <div key={detail.id}>
            {detail.id !== "" ? <h1>{detail.header}</h1> : ""}
            {text.map((line, idx) => {
              return <p key={idx}>{line}</p>;
            })}
          </div>
        );
      })}
    </>
  );
}

export default App;
