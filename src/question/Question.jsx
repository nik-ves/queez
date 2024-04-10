import styled from "styled-components";

export default function Question({ details, type }) {
  const text = details.text;

  return (
    <QuestionBox>
      <h2>#1 (Single answer)</h2>

      {details.header && <h3>{details.header}</h3>}

      {text?.map((line, idx) => {
        return <p key={idx}>{line}</p>;
      })}
    </QuestionBox>
  );
}

const QuestionBox = styled.section`
  margin-bottom: 50px;
  font-size: 20px;
`;
