import React from 'react';
import { css } from '@emotion/core';
import Layout from '../components/layout/Layout';
import { Form, InputContainer, InputSubmit } from '../components/ui/Form';

const NewAccount = () => {
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
          <Form>
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
                />
            </InputContainer>
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
                />
            </InputContainer>
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
                />
            </InputContainer>
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