import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import useAuthorization from "../../hooks/useAuthorization";
import CriarComentario from "../../components/CriarComentario/CriarComentario";

function PostPage() {
  useAuthorization();

  useEffect(() => {
    getPostDetail();
  }, []);
  const token = localStorage.getItem("token");
  const pathParams = useParams();

  const [postDetail, setPostDetail] = useState({ comments: [] });

  const getPostDetail = () => {
    const headers = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.postId}`,
        headers
      )
      .then((response) => {
        setPostDetail(response.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const voteComment = (id, decisao, userVoteDirection) => {
    let body;
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
        `https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${pathParams.postId}/comment/${id}/vote`,
        body,
        headers
      )
      .then((response) => {
        getPostDetail();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const votePost = (id, decisao, userVoteDirection) => {
    let body;
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
        getPostDetail();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listComments = postDetail.comments.map((comment) => {
    return (
      <div key={comment.id}>
        <div>Nome:{comment.username}</div>
        <div>Texto Comentario:{comment.text}</div>
        <div>
          <button
            onClick={() =>
              voteComment(comment.id, 1, comment.userVoteDirection)
            }
          >
            Curtir
          </button>
          <span>Votos:{comment.votesCount}</span>
          <button
            onClick={() =>
              voteComment(comment.id, -1, comment.userVoteDirection)
            }
          >
            Descurtir
          </button>
        </div>
        <hr></hr>
      </div>
    );
  });

  console.log(postDetail);

  return (
    <div>
      <CriarComentario getPostDetail={getPostDetail} />
      <h1>POST</h1>
      <h3>{postDetail.username}</h3>
      <div>Texto:{postDetail.text}</div>
      <div>
        <button
          onClick={() =>
            votePost(postDetail.id, 1, postDetail.userVoteDirection)
          }
        >
          Curtir
        </button>
        <span>Votos:{postDetail.votesCount}</span>
        <button
          onClick={() =>
            votePost(postDetail.id, -1, postDetail.userVoteDirection)
          }
        >
          Descurtir
        </button>
      </div>

      <div>Comentarios:{postDetail.commentsCount}</div>
      <hr></hr>
      <h1>Comentarios</h1>
      <div>{listComments}</div>
    </div>
  );
}

export default PostPage;
