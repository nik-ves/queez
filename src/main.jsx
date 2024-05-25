import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QuizProvider } from "./context/QuizContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QuizProvider>
        <App />
      </QuizProvider>
    </BrowserRouter>
  </React.StrictMode>
);
