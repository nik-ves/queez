import { useState } from "react";
import styled from "styled-components";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AnswerDropdown({ answers }) {
  return (
    <>
      {answers.map((answer, idx) => {
        const options = answer.options;

        return (
          <AnswerLine key={idx}>
            <p>{answer.text}</p>

            <DropdownMenu
              options={options}
              correctOption={answer.correctOption}
            />
          </AnswerLine>
        );
      })}
    </>
  );
}

function DropdownMenu({ options, correctOption }) {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
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
        setSelectStyles({
          "& .MuiSelect-select": {
            color: "black",
            backgroundColor: "red",
          },
        });
      }
    } else {
      setSelectStyles({
        "& .MuiSelect-select": {
          color: "black",
          backgroundColor: "white",
        },
      });
    }
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
      <Select
        sx={selectStyles}
        value={selectedAnswer}
        onChange={handleSelect}
        displayEmpty
        defaultValue=""
      >
        <MenuItem value="">&nbsp;</MenuItem>
        {options.map((option, idx) => {
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

const AnswerLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid white;
`;
