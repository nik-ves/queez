import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <Navigation>
        <Logo to="/">Queez</Logo>
      </Navigation>

      <Outlet />
    </>
  );
}

const Navigation = styled.nav`
  text-align: center;
`;

const Layout = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 50px;
  font-weight: 700;

  &:hover {
    color: white;
  }
`;
