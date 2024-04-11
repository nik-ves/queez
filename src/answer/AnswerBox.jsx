import styled from "styled-components";

import AnswerSingle from "./AnswerSingle";
import AnswerMultiple from "./AnswerMultiple";
import AnswerDropdown from "./AnswerDropdown";

export default function AnswerBox({ answers, type }) {
  if (type === "single") {
    return (
      <AnswerBody>
        <AnswerSingle answers={answers} />
      </AnswerBody>
    );
  } else if (type === "multiple") {
    return (
      <AnswerBody>
        <AnswerMultiple answers={answers} />
      </AnswerBody>
    );
  } else if (type === "dropdown") {
    return (
      <AnswerBody>
        <AnswerDropdown answers={answers} />
      </AnswerBody>
    );
  } else {
    return null;
  }
}

const AnswerBody = styled.section``;
