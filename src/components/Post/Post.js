/*
 * COMPONENTE POST
 */

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;
const Nome = styled.h1`
  font-size: 16px;
`;
const Texto = styled.div`
  width: 400px;
  height: 100px;
  background-color: #77fde9;
`;
const Rodape = styled.div`
  display: flex;
  width: 10%;
  flex-direction: row;
  justify-content: space-between;
`;
const Likes = styled.button``;
const LikeCounter = styled.div``;
const DesLikes = styled.button``;

const Post = () => {
  return (
    <Container>
      <Nome>Post</Nome>
      <Texto />
      <Rodape>
        <Likes>+</Likes>
        <LikeCounter>0</LikeCounter>
        <DesLikes>-</DesLikes>
      </Rodape>
    </Container>
  );
};

export default Post;
