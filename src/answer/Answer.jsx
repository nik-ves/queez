import styled from "styled-components";

export default function Answer({ answer }) {
  return <AnswerBox>{answer.text}</AnswerBox>;
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
