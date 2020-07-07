import React from "react";
import Router from "./Router";
import styled from "styled-components";

const Container = styled.div`
  background: #6fc3f6;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  max-width: 960px;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1rem;
`;
function App() {
  return (
    <Container>
      <Content>
        <Router />
      </Content>
    </Container>
  );
}

export default App;
