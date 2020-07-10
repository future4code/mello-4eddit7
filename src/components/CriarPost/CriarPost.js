import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
const Entrada = styled.input``;

const CriarPost = (props) => {
  const token = localStorage.getItem("token");
  const [textPost, setTextPost] = useState("");

  const history = useHistory();

  const handleInputPost = (event) => {
    setTextPost(event.target.value);
  };

  const createPost = () => {
    const body = {
      text: textPost,
      title: "Titulo aqui!",
    };

    const headers = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts",
        body,
        headers
      )
      .then((response) => {
        setTextPost("");
        props.getPosts();
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
        <Entrada
          value={textPost}
          onChange={handleInputPost}
          placeholder="Escreva seu post!"
        />
        <button onClick={createPost}>Postar</button>
        <button onClick={handleLogout}>Logout</button>
      </Container>
    </div>
  );
};

export default CriarPost;
