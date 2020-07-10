import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useAuthorization from "../../hooks/useAuthorization";
import CriarPost from "../../components/CriarPost/CriarPost";

import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";

const EstiloFeed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  justify-content: center;
  justify-items: center;
  margin: auto;
`;

const StyleListPosts = styled.div`
  border: solid black 1px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: center;
  width: 500px;
  min-height: 200px;
`;

const StyleListDetails = styled.div`
  display: flex;
  border: solid black 1px;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 100px;
`;

let body;

function FeedPage() {
  useAuthorization();
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);
  const [condicao, setCondicao] = useState();

  let history = useHistory();

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    const headers = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts",
        headers
      )
      .then((response) => {
        setPosts(response.data.posts);
        setCondicao(1);

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(condicao);

  const votePost = (id, decisao, userVoteDirection) => {
    if (userVoteDirection === decisao) {
      body = {
        direction: 0,
      };
    } else {
      body = {
        direction: decisao,
      };
    }

    const headers = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${id}/vote`,
        body,
        headers
      )
      .then((response) => {
        getPosts();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const goToPostPage = (idPost) => {
    history.push(`/post/${idPost}`);
  };

  const listPosts = posts.map((post) => {
    return (
      <Paper elevation={3}>
        <StyleListPosts>
          <h3>{post.username}</h3>
          <div>{post.text}</div>
          <StyleListDetails>
            <div>
              <button
                onClick={() => votePost(post.id, 1, post.userVoteDirection)}
              >
                Curtir
              </button>
            </div>
            <div>{post.votesCount}</div>
            <div>
              <button
                onClick={() => votePost(post.id, -1, post.userVoteDirection)}
              >
                Descurtir
              </button>
            </div>

            <div>
              {post.commentsCount} - Comentários
              <span>
                <button onClick={() => goToPostPage(post.id)}>Detalhes</button>
              </span>
            </div>
          </StyleListDetails>
        </StyleListPosts>
      </Paper>
    );
  });

  console.log(posts);

  if (condicao === undefined) {
    return (
      <EstiloFeed>
        <CircularProgress />
      </EstiloFeed>
    );
  } else {
    return (
      <div>
        <EstiloFeed>
          <h1>Feed</h1>
          <CriarPost getPosts={getPosts} />
          <hr></hr>
          <div>{listPosts}</div>
        </EstiloFeed>
      </div>
    );
  }
}

export default FeedPage;
