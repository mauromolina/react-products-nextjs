import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const InputText = styled.input`
    border: 1px solid var(--gray3);
    padding: 1rem;
    min-width: 300px;
`;

const ButtonSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -999px;

    &:hover {
        cursor: pointer;
    }
`;

const Searcher = () => {
    return ( 
        <form
            css={css`
                position: relative;
            `}>
            <InputText
                type="text"
                placeholder="Buscar"
            />
            <ButtonSubmit
                type="submit"
            >
                Buscar
            </ButtonSubmit>
        </form>
     );
}
 
export default Searcher;