import { useEffect, useState } from "react";
import styled from "styled-components";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AnswerDropdown({ answers }) {
  return (
    <>
      {answers.map((answer, idx) => {
        const options = answer.options;

        if (answer.type === "text") {
          return (
            <AnswerLine key={idx}>
              <p>{answer.text}</p>

              <DropdownMenu
                options={options}
                correctOption={answer.correctOption}
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
              />
            </CodeBox>
          );
        }
      })}
    </>
  );
}

function DropdownMenu({ options, correctOption }) {
  const [selectedAnswer, setSelectedAnswer] = useState("none");
  const [selectStyles, setSelectStyles] = useState({
    "& .MuiSelect-select": {
      color: "black",
      backgroundColor: "white",
    },
  });

  function handleSelect(event) {
    setSelectedAnswer(event.target.value);

    if (event.target.value !== "") {
      if (event.target.value === correctOption) {
        setSelectStyles({
          "& .MuiSelect-select": {
            color: "black",
            backgroundColor: "green",
          },
        });
      } else {
        if (event.target.value === "none") {
          setSelectStyles({
            "& .MuiSelect-select": {
              color: "black",
              backgroundColor: "white",
            },
          });
        } else {
          setSelectStyles({
            "& .MuiSelect-select": {
              color: "black",
              backgroundColor: "red",
            },
          });
        }
      }
    }
  }

  useEffect(() => {
    return () => {
      setSelectStyles({
        "& .MuiSelect-select": {
          color: "black",
          backgroundColor: "white",
        },
      });

      setSelectedAnswer("none");
    };
  }, [options]);

  return (
    <FormControl sx={{ m: 1, width: 300 }} size="small">
      <Select
        sx={selectStyles}
        value={selectedAnswer}
        onChange={handleSelect}
        displayEmpty
        defaultValue="none"
      >
        <MenuItem value="none">&nbsp;</MenuItem>
        {options?.map((option, idx) => {
          return (
            <MenuItem key={idx} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

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
