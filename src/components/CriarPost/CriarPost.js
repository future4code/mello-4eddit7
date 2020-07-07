import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
const Entrada = styled.textarea``;
const Postar = styled.button``;

const CriarPost = () => {
  return (
    <Container>
      <Entrada placeholder="Escreva seu post!" />
      <Postar>Postar</Postar>
    </Container>
  );
};

export default CriarPost;
