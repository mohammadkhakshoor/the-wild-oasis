import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";
import Input from "./ui/Input";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
  padding: 3rem;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1">the wild oasis</Heading>
            <div action="">
              <Heading as="h2">check in and out</Heading>
              <Button variations="primary" size="medium">
                check in
              </Button>
              <Button variations="secondary" size="small">
                check out
              </Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading as="h3">Form</Heading>
            <form action="">
              <Input placeholder="Number of guests" />
              <Input placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
