import { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuizResult } from "../../hooks/useQuizResult";
import { getAnswerIfExist } from "../../utils/helpers";

export default function AnswerDropdown({ answers }) {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  return (
    <>
      {answers.map((answer, idx) => {
        const options = answer.options;

        const allCorrectAnswers = answers.map((answer) => {
          return {
            id: answer.id,
            questionId: answer.questionId,
            option: answer.correctOption,
          };
        });

        if (answer.type === "text") {
          return (
            <AnswerLine key={idx}>
              <p>{answer.text}</p>

              <DropdownMenu
                options={options}
                correctOption={answer.correctOption}
                allCorrectAnswers={allCorrectAnswers}
                questionId={answer.questionId}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
                index={idx}
              />
            </AnswerLine>
          );
        } else {
          return (
            <CodeBox key={idx}>
              <code>{answer.text}</code>

              <DropdownMenu
                options={options}
                correctOption={answer.correctOption}
                allCorrectAnswers={allCorrectAnswers}
                questionId={answer.questionId}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
                index={idx}
              />
            </CodeBox>
          );
        }
      })}
    </>
  );
}

function DropdownMenu({
  options,
  correctOption,
  allCorrectAnswers,
  questionId,
  index,
  selectedAnswers,
  setSelectedAnswers,
}) {
  const { quizResult, answerDropdown, setPreventAnswer } = useQuizResult();
  const existingAnswer = getAnswerIfExist(
    quizResult.dropdown,
    allCorrectAnswers[0].questionId,
    index
  )[0];

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (existingAnswer) {
      setSelectedAnswers((oldState) => {
        let duplicate = oldState?.find((item) => item.id === existingAnswer.id);

        if (duplicate) {
          return [...oldState];
        } else {
          return [...oldState, existingAnswer];
        }
      });
      setSelectedAnswer(existingAnswer?.option);
      setPreventAnswer(false);
    }

    return () => {
      setPreventAnswer(true);
    };
  }, []);

  function handleSelect(event) {
    setSelectedAnswer(event.target.value);

    setSelectedAnswers((prevState) => {
      let duplicate = prevState.find((item) => item.id === index);

      if (duplicate) {
        const filteredState = prevState.map((obj) =>
          obj.id === duplicate.id ? { ...obj, answer: event.target.value } : obj
        );

        return [...filteredState];
      }

      return [...prevState, { id: index, answer: event.target.value }];
    });

    answerDropdown(
      { id: index, questionId: questionId, option: event.target.value },
      allCorrectAnswers
    );
  }

  function styles(_option) {
    if (_option === "none") {
      return { color: "black", backgroundColor: "white" };
    } else if (
      _option == correctOption &&
      selectedAnswers.length === allCorrectAnswers.length
    ) {
      return { color: "white", backgroundColor: "green" };
    } else if (
      _option != correctOption &&
      selectedAnswers.length === allCorrectAnswers.length
    ) {
      return { color: "white", backgroundColor: "red" };
    }
  }

  return (
    <SelectBody>
      <select
        onChange={handleSelect}
        name="languages"
        id="languages"
        defaultValue={"none"}
        style={styles(selectedAnswer)}
        value={selectedAnswer ? selectedAnswer : null}
      >
        <option disabled={true} style={styles("none")} value="none">
          &nbsp;
        </option>
        {options?.map((option, idx) => {
          return (
            <option
              disabled={selectedAnswers.length === allCorrectAnswers.length}
              style={selectedAnswer !== "none" ? styles(option) : null}
              key={idx}
              value={option}
            >
              {option}
            </option>
          );
        })}
      </select>
    </SelectBody>
  );
}

const SelectBody = styled.div`
  display: flex;
  flex-direction: column;
  color: black;

  & select {
    border: none;
    padding: 10px;
    outline: none;
    font-family: inherit;
    border-radius: 5px;
    font-size: 16px;
    color: black;
    width: 200px;

    &:hover,
    &:focus {
      cursor: pointer;
    }

    &:checked,
    &:disabled {
      color: blue;
      background-color: blue;
    }
  }
`;

const CodeBox = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid white;
  color: white;

  font-size: 15px;
  transition: all 0.2s;
  font-weight: inherit;

  display: flex;
  justify-content: space-between;

  &:hover {
    cursor: pointer;
    border-color: #646cff;
  }

  &.active {
    border-color: #646cff;
    scale: 1.03;
  }
`;

const AnswerLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid white;
  align-items: center;
  transition: all 0.2s;
  color: white;

  & p {
    width: 45%;
  }

  &:hover {
    cursor: pointer;
    border-color: #646cff;
  }

  &.active {
    border-color: #646cff;
    scale: 1.03;
  }

  &:active,
  &:visited,
  &:focus {
    outline: none;
  }
`;
