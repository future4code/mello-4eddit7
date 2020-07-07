import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: white;
  padding: 10px;
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  max-height: 400px;
  height: 230px;
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

const LoginPage = () => {
  return (
    <Container>
      <Content>
        <form>
          <div>
            <p>Email</p>
            <Input type="email" />
          </div>
          <div>
            <p>Senha</p>
            <Input type="password" />
          </div>
          <div>
            <span>Criar Conta</span>
            <Button type="submit">Entrar</Button>
          </div>
        </form>
      </Content>
    </Container>
  );
};

export default LoginPage;
