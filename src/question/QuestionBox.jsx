import styled from "styled-components";

function setHeader(type) {
  switch (type) {
    case "single":
      return "(Single answer)";

    case "multiple":
      return "(Multiple answers)";

    case "dropdown":
      return "(Select from the dropdown menu)";

    case "dragdrop":
      return "(Drag and Drop)";
  }
}

export default function QuestionBox({ question }) {
  return (
    <QuestionBody>
      {question?.answerType && <h2>{setHeader(question?.answerType)}</h2>}

      <p>{question?.text}</p>

      {question?.image && <img src={question?.image} alt="questionImage" />}
    </QuestionBody>
  );
}

const QuestionBody = styled.section`
  margin-bottom: 50px;

  & p {
    white-space: pre-line;
    font-size: 20px;
  }
`;
