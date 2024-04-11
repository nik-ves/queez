import { useState } from "react";
import styled from "styled-components";

export default function AnswerDragDrop({ answers, correctAnswers }) {
  console.log(answers);

  const [widgets, setWidgets] = useState([]);

  function handleOnDrag(event, widgetType) {
    event.dataTransfer.setData("widgetType", widgetType);
  }

  function handleOnDrop(event) {
    const widgetType = event.dataTransfer.getData("widgetType");
    setWidgets([...widgets, widgetType]);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  return (
    <AnswerBody>
      <Answers>
        {answers.map((answer, idx) => (
          <AnswerLine
            key={idx}
            draggable
            onDragStart={(event) => handleOnDrag(event, answer.text)}
          >
            {answer.text}
          </AnswerLine>
        ))}
      </Answers>

      <DropBody
        className="page"
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
      >
        {/* {widgets.map((widget, idx) => (
          <AnswerLine key={idx}>{widget}</AnswerLine>
        ))} */}

        {/* {correctAnswers?.map((answer, idx) => {
          return <AnswerLine key={idx}>{answer}</AnswerLine>;
        })} */}
      </DropBody>
    </AnswerBody>
  );
}

const AnswerLine = styled.button`
  border: 1px solid white;
  width: 100%;
  padding: 0 15px;
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
  background-color: green;
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
