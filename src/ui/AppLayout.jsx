import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function AppLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

const Layout = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
`;
