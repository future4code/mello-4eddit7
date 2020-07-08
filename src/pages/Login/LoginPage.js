import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  background: white;
  padding: 10px;
  border-radius: 20px;
  max-width: 600px;
  width: 350px;
  max-height: 400px;
  height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    & + * {
      margin-top: -20px;
    }
    p {
      font-size: 20px;
      margin-bottom: 0.5rem;
    }
    &:last-child {
      margin-top: 0.5em;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  span {
    padding: 5px;
    font-weight: bold;
    text-decoration: none;
    color: #1da1f2;
    cursor: pointer;
  }
`;

const Input = styled.input`
  border: none;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  &:active,
  &:focus {
    border: none;
    outline: none;
    border-bottom: 1px solid #1da1f2;
  }
`;

const Button = styled.button`
  background: white;
  border: 1px solid #1da1f2;
  padding: 0.6rem 1.3rem;
  border-radius: 20px;
  color: #1da1f2;
  font-size: 14px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  &:hover {
    background: #1da1f2;
    color: white;
  }
`;

const ErrorWarning = styled.div`
  border: 1px solid red;
  color: red;
  border-radius: 20px;
  padding: 2px;
  padding-top: 45px;
`;

const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const goToRegisterPage = () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    const body = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/login",
        body
      );

      localStorage.setItem("token", response.data.token);
      history.replace("/feed");
    } catch (e) {
      if (e.response.status === 401) {
        setError("Login ou senha inválido(a)");
      } else {
        alert("Login falhou :(");
      }
    }
  };

  return (
    <Container>
      <Content>
        {error && <ErrorWarning>{error}</ErrorWarning>}
        <div>
          <p>Email</p>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <p>Senha</p>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <span onClick={goToRegisterPage}>Criar Conta</span>
          <Button onClick={handleLogin}>Entrar</Button>
        </div>
      </Content>
    </Container>
  );
};

export default LoginPage;
