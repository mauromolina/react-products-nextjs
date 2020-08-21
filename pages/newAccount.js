import React, {useState} from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import { Form, InputContainer, InputSubmit, Error } from '../components/ui/Form';
import useValidation from '../hooks/useValidation';
import validateNewAccount from '../validation/validateNewAccount';
import firebase from '../firebase';

const NewAccount = () => {

  const [ error, setError ] = useState(false);

  const initialState = {
    name: '',
    email: '',
    password: ''
  }
  
  const {values, errors, submitForm, handleSubmit, handleChange, handleBlur} = useValidation(initialState, validateNewAccount, createAccount);

  const { name, email, password } = values;

  async function createAccount() {
    try {
      await firebase.createAccount(name, email, password);
      Router.push('/');
    } catch (error) {
      console.log('Hubo un error al crear el usuario', error.message);
      setError(error.message);
    }
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

            {error && <Error>{error}</Error>}
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