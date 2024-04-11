import { useEffect, useState } from "react";
import styled from "styled-components";

import { shuffleArray } from "../utils/helpers";

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
            <DropLine key={i} index={i} />
          ))}
      </DropBody>
    </AnswerBody>
  );
}

function DropLine({ index }) {
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
      if (answer?.correctPlace === index) {
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
  }, []);

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
  /* background-color: green; */
`;

// export default function AnswerDragDrop({ answers, correctAnswers }) {
//   // console.log(answers);
//   console.log(correctAnswers);
//   const [widgets, setWidgets] = useState([]);

//   function handleOnDrag(event, widgetType) {
//     event.dataTransfer.setData("widgetType", widgetType);
//   }

//   function handleOnDrop(event) {
//     const widgetType = event.dataTransfer.getData("widgetType");
//     setWidgets([...widgets, widgetType]);
//   }

//   function handleDragOver(event) {
//     event.preventDefault();
//   }

//   return (
//     <div>
//       <div>
//         <div
//           className="widget"
//           draggable
//           onDragStart={(event) => handleOnDrag(event, "Pitanje 1")}
//         >
//           Pitanje 1
//         </div>

//         <div
//           className="widget"
//           draggable
//           onDragStart={(event) => handleOnDrag(event, "Pitanje 2")}
//         >
//           Pitanje 2
//         </div>

//         <div
//           className="widget"
//           draggable
//           onDragStart={(event) => handleOnDrag(event, "Pitanje 3")}
//         >
//           Pitanje 3
//         </div>
//       </div>
//       <div className="page" onDrop={handleOnDrop} onDragOver={handleDragOver}>
//         {widgets.map((widget, idx) => (
//           <div key={idx}>{widget}</div>
//         ))}
//       </div>
//     </div>
//   );
// }
