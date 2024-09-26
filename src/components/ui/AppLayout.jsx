import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";

export default function AppLayout() {
  const { resetQuiz } = useQuiz();

  return (
    <>
      <Navigation>
        <Logo
          onClick={() => {
            resetQuiz();
          }}
          to="/"
        >
          Queez
        </Logo>
      </Navigation>

      <Outlet />
    </>
  );
}

const Navigation = styled.nav`
  text-align: center;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 50px;
  font-weight: 700;

  &:hover {
    color: white;
  }
`;
