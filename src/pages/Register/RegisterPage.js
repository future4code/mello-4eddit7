import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  background: white;
  padding: 20px;
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

const useForm = initialValues => {
  const[form, setForm] = useState(initialValues)

  const onChange = (name, value) => {
    const newForm = { ...form, [name]: value}
    setForm(newForm)
  }

  return {form, onChange}
}

const RegisterPage = () => {
  const history = useHistory()
  const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit"

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token !== null) {
      history.push("/feed")
    }
  }, [history])

  const {form, onChange} = useForm ({
    username: "",
    email: "",
    password: "",
  })

  const handleInputChange = event => {
    const {name, value} = event.target

    onChange(name, value)
  }

  const goToLoginPage = () => {
    history.push("/")
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post(`${baseUrl}/signup`, form)

      localStorage.setItem("token", response.data.token)
      history.replace("/feed")
    } catch (e) {
      alert("Cadastro falhou :(")
    }
  }

  return (
    <Container>
      <Content>
        <form onSubmit={handleSubmit}>
          <div>
            <p>Nome de usuário</p>
            <Input 
              type="text"
              name="username"
              value={form.username}
              pattern="[A-Za-z0-9]{3,}"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <p>Email</p>
            <Input 
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <p>Senha</p>
            <Input 
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <span onClick={goToLoginPage}>Cancelar</span>
            <Button>Cadastrar</Button>
          </div>
        </form>
      </Content>
    </Container>
  );
}

export default RegisterPage;
