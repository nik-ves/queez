import styled from "styled-components";

function setHeader(type) {
  switch (type) {
    case "single":
      return "(Single answer)";
    case "multiple":
      return "(Multiple answers)";
    case "dropdown":
      return "(Select from the dropdown menu)";
  }
}

export default function QuestionBox({ details, type }) {
  return (
    <QuestionBody>
      {type && <h2>{setHeader(type)}</h2>}

      {details?.map((detail, idx) => {
        return (
          <div key={idx}>
            {detail.header && <h3>{details.header}</h3>}

            <p>{detail.text}</p>
          </div>
        );
      })}
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
