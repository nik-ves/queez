import styled from "styled-components";

export default function Spinner() {
  return (
    <SpinnerBody>
      <StyledSpinner />
    </SpinnerBody>
  );
}

const SpinnerBody = styled.div`
  width: 100%;
  margin: 100px 10px;
  display: flex;
  justify-content: center;
`;

const StyledSpinner = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #535bf2;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
`;
