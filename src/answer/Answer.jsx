import styled from "styled-components";

export default function Answer({ answer }) {
  function validateAnswer() {
    if (answer.result === "true") {
      console.log("Tacan odgovor!");
    } else {
      console.log("Pogresan odgovor");
    }
  }

  return <AnswerBox onClick={validateAnswer}>{answer.text}</AnswerBox>;
}

const AnswerBox = styled.p`
  border: 1px solid white;
  /* padding: 0 15px; */
  padding: 10px;
  font-size: 15px;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    border-color: #646cff;
  }
`;
