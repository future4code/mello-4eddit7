import React from "react";
import CriarPost from "../../components/CriarPost/CriarPost";
import ListaDePost from "../../components/ListaDePost/ListaDePost";

const PostsPage = () => {
  return (
    <div>
      <CriarPost></CriarPost>
      <ListaDePost />
    </div>
  );
};

export default PostsPage;
