import styled from "styled-components";

import AnswerSingle from "./AnswerSingle";
import AnswerMultiple from "./AnswerMultiple";
import AnswerDropdown from "./AnswerDropdown";
import AnswerDragDrop from "./AnswerDragDrop";

export default function AnswerBox({ type, answers, correctAnswers }) {
  switch (type) {
    case "single":
      return (
        <AnswerBody>
          <AnswerSingle answers={answers} />
        </AnswerBody>
      );

    case "multiple":
      return (
        <AnswerBody>
          <AnswerMultiple answers={answers} />
        </AnswerBody>
      );

    case "dropdown":
      return (
        <AnswerBody>
          <AnswerDropdown answers={answers} />
        </AnswerBody>
      );

    case "dragdrop":
      return (
        <AnswerBody>
          <AnswerDragDrop answers={answers} correctAnswers={correctAnswers} />
        </AnswerBody>
      );

    default:
      return null;
  }
}

const AnswerBody = styled.section``;
