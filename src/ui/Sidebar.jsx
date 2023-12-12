import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
};

export default Sidebar;
