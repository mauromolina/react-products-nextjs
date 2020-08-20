import React from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import { Form, InputContainer, InputSubmit, Error } from '../components/ui/Form';
import useValidation from '../hooks/useValidation';
import validateNewAccount from '../validation/validateNewAccount';

const NewAccount = () => {

  const initialState = {
    name: '',
    email: '',
    password: ''
  }
  
  const {values, errors, submitForm, handleSubmit, handleChange, handleBlur} = useValidation(initialState, validateNewAccount, createAccount);

  const { name, email, password } = values;

  function createAccount() {
    console.log('Creando cuenta');
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}>
              Crear cuenta
            </h1>
          <Form
            onSubmit={handleSubmit}
            noValidate
          >
            <InputContainer>
              <label
                htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
            </InputContainer>
            { errors.name && <Error>{errors.name}</Error>}
            <InputContainer>
              <label
                htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
            </InputContainer>
            { errors.email && <Error>{errors.email}</Error>}
            <InputContainer>
              <label
                htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
            </InputContainer>
            { errors.password && <Error>{errors.password}</Error>}
            <InputSubmit
              type="submit"
              value="Crear cuenta"
            />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default NewAccount;