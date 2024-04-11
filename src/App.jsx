import { useState } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import QuestionBox from "./question/QuestionBox";
import AnswerBox from "./answer/AnswerBox";
import supabase from "./services/supabase";

function App() {
  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState();
  const [questionDetails, setQuestionDetails] = useState();

  async function test() {
    const { data, error } = await supabase
      .from("get_random_question")
      .select(
        `
        id, 
        answerType, 
        answer ( * ),
        question_details ( id, header, text )
        `
      )
      .eq("quiz_id", "1")
      // .eq("id", "10")
      .limit(1)
      .single();

    setQuestion(data);
    setQuestionDetails(data?.question_details);
    setAnswers(data?.answer);
  }

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

      <QuestionBox details={questionDetails} type={question?.answerType} />

      <AnswerBox answers={answers} type={question?.answerType} />

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
