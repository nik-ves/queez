import { useEffect, useState } from "react";
import styled from "styled-components";

import { shuffleArray } from "../../utils/helpers";

export default function AnswerDragDrop({ answers, correctAnswers }) {
  const [shuffledArray, setShuffledArray] = useState([]);

  function handleOnDrag(event, answer) {
    event.dataTransfer?.setData("answer", JSON.stringify(answer));
  }

  useEffect(() => {
    const shuffled = shuffleArray(answers);
    setShuffledArray(shuffled);
  }, [answers]);

  return (
    <AnswerBody>
      <Answers>
        {shuffledArray.map((answer, idx) => (
          <AnswerLine
            key={idx}
            draggable
            onDragStart={(event) => handleOnDrag(event, answer)}
          >
            {answer.text}
          </AnswerLine>
        ))}
      </Answers>

      <DropBody>
        {correctAnswers > 0 &&
          [...Array(correctAnswers)].map((x, i) => (
            <DropLine answers={answers} key={i} index={i} />
          ))}
      </DropBody>
    </AnswerBody>
  );
}

function DropLine({ index, answers }) {
  const [answer, setAnswer] = useState();

  function handleOnDrop(event) {
    const answer = JSON.parse(event.dataTransfer?.getData("answer"));
    setAnswer(answer);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function getStyles() {
    if (answer) {
      if (answer?.correctArrayPlace === index) {
        return { backgroundColor: "green" };
      } else {
        return { backgroundColor: "red" };
      }
    } else {
      return {};
    }
  }

  useEffect(() => {
    return () => {
      setAnswer(null);
    };
  }, [answers]);

  return (
    <AnswerLine
      style={getStyles()}
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
    >
      {answer ? answer.text : <>&nbsp;</>}
    </AnswerLine>
  );
}

const AnswerLine = styled.button`
  border: 1px solid white;
  width: 100%;
  padding: 10px;
  font-size: 15px;
  transition: all 0.2s;
  font-weight: inherit;
  color: white;

  background-color: transparent;
  font-weight: inherit;
  text-align: left;
  border-radius: 0;
  margin-bottom: 15px;
  outline: none;

  &:hover {
    cursor: pointer;
    border-color: #646cff;
  }

  &.active {
    border-color: #646cff;
    scale: 1.03;
  }

  &.correct {
    background-color: green;
  }

  &.wrong {
    background-color: red;
  }

  &:active,
  &:visited,
  &:focus {
    outline: none;
  }
`;

const AnswerBody = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Answers = styled.div`
  width: 45%;
`;

const DropBody = styled.div`
  width: 45%;
`;
