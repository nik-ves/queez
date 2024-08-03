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

export default function QuestionBox({ question, questionNumber }) {
  return (
    <QuestionBody>
      {question?.answerType && (
        <h2>
          #{questionNumber + 1} {setHeader(question?.answerType)}
        </h2>
      )}

      <p>{question?.text}</p>

      {question?.image && <img src={question?.image} alt="questionImage" />}
    </QuestionBody>
  );
}

const QuestionBody = styled.section`
  margin-bottom: 50px;
  padding: 20px;
  border: 2px solid white;

  @media only screen and (max-width: 1000px) {
    margin-bottom: 25px;
    padding: 10px;
  }

  h2 {
    color: white;
    @media only screen and (max-width: 1000px) {
      font-size: 22px;
    }

    @media only screen and (max-width: 500px) {
      font-size: 18px;
    }
  }

  & p {
    white-space: pre-line;
    font-size: 20px;
    color: white;

    @media only screen and (max-width: 1000px) {
      font-size: 18px;
    }

    @media only screen and (max-width: 500px) {
      font-size: 15px;
    }
  }
`;
