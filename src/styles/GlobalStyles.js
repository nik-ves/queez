import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  background-color: #242424;
}

#root {
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  display: flex;
  /* place-items: center; */
  /* min-width: 320px; */
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.25s;
}
button:hover {
  background-color: #646cff;
  color: white;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

code {
  white-space: pre-wrap;
}

h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    margin-top: 0;
    margin-bottom: 0;
}

img {
  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
}
`;

export default GlobalStyles;
