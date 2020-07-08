import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  background: white;
  padding: 25px;
  border-radius: 20px;
  max-width: 400px;
  width: 350px;
  max-height: 400px;
  height: 280px;
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

const RegisterPage = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToLoginPage = () => {
    history.push("/");
  };

  const handleRegister = async () => {
    const body = {
      username: userName,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://us-central1-labenu-apis.cloudfunctions.net/labEddit/signup",
        body
      );

      localStorage.setItem("token", response.data.token);
      history.replace("/feed");
    } catch (e) {
      alert("Cadastro falhou :(");
    }
  };

  return (
    <Container>
      <Content>
        <div>
          <p>Nome de usuário</p>
          <Input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
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
          <span onClick={goToLoginPage}>Cancelar</span>
          <Button onClick={handleRegister}>Cadastrar</Button>
        </div>
      </Content>
    </Container>
  );
};

export default RegisterPage;
