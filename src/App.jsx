import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";
import Input from "./ui/Input";
import Button from "./ui/Button";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 3rem;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp></StyledApp>
    </>
  );
}

export default App;
