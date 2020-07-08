import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

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
  const [texto, setTexto] = useState("");

  const url =
    "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts";
  const data = {
    text: texto,
    title: "Titulo teste!",
  };
  const axiosConfig = {
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBlWTZ2VlhVM0owNDRnV0ZPd2JIIiwidXNlcm5hbWUiOiJoZW5yaXF1ZSIsImVtYWlsIjoiaGVucmlxdWVAZ21haWwuY29tIiwiaWF0IjoxNTk0MTQ5NTkyfQ.CFSIKdbLoirtTzbH63EtnrJZ0NtcJ_bTL-Nqsba4uTs",
    },
  };

  const f = () => {
    axios
      .post(url, data, axiosConfig)
      .then(console.log(data))
      .catch((err) => console.log(err));
  };

  const handleEntrada = (event) => {
    setTexto(event.target.value);
  };

  return (
    <Container>
      <Entrada placeholder="Escreva seu post!" onChange={handleEntrada} />
      <Postar onClick={f}>Postar</Postar>
    </Container>
  );
};

export default CriarPost;
