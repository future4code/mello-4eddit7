import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
const Entrada = styled.input``;

const CriarComentario = (props) => {
  const token = localStorage.getItem("token");
  const [textComment, setTextComment] = useState("");

  const history = useHistory();
  const pathParams = useParams();

  const goBack = () => {
    history.goBack();
  };

  const handleInputComment = (event) => {
    setTextComment(event.target.value);
  };

  const createComment = () => {
    const body = {
      text: textComment,
    };

    const headers = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.postId}/comment`,
        body,
        headers
      )
      .then((response) => {
        setTextComment("");
        props.getPostDetail();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <Container>
        <p>Criar Comentário:</p>
        <Entrada
          value={textComment}
          onChange={handleInputComment}
          placeholder="Comente aqui!"
        />
        <button onClick={createComment}>Comentar</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={goBack}>Voltar</button>
      </Container>
    </div>
  );
};

export default CriarComentario;
