import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Main from "./Main";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Sidebar />
      <Header />

      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
