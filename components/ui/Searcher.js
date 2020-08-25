import React, {useState} from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Router from 'next/router';

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

    const [search, setSearch] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if(search.trim() === '') return;
        console.log(search);
        Router.push({
            pathname:'/search',
            query: { q : search}
        })
    }

    return ( 
        <form
            css={css`
                position: relative;
            `}
            onSubmit={handleSubmit}
            >
            <InputText
                type="text"
                placeholder="Buscar"
                onChange={ e => setSearch(e.target.value)}
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