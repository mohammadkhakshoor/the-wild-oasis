import styled from "styled-components";

const StyledMain = styled.main`
  background-color: yellow;
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);
`;
const Main = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default Main;
