import React, {useContext} from 'react';
import Searcher from '../ui/Searcher';
import Nav from './Nav';
import Button from '../ui/Button';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/core'
import {FirebaseContext} from '../../firebase';

const HeaderContainer = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width: 768px){
        display: flex;
        justify-content:space-between;
    }    
`;

const Logo = styled.a`
    color: var(--orange);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
`;

const Header = () => {

    const {user, firebase } = useContext(FirebaseContext);

    return ( 
        <header
            css={css`
                border-bottom: 2px solid var(--gray3);
                padding: 1rem 0;
            `}>
            <HeaderContainer>
                <div
                    css={css`
                        display:flex;
                        align-items:center;
                    `}>
                    <Link href="/">
                        <Logo>M</Logo>
                    </Link>
                    <Searcher/>
                    <Nav/>
                </div>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}>

                    { user ? (
                        <>
                            <p
                                css={css`
                                margin-right: 2rem;
                            `}>
                                Hola, {user.displayName}
                            </p>
                            <Button
                                type="button"
                                bgColor="true"
                                onClick={() => firebase.logOut()}
                            >
                                Cerrar sesión
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button
                                    bgColor="true"
                                >
                                    Iniciar sesión
                                </Button>
                            </Link>
                            <Link href="/newAccount">
                                <Button>
                                    Crear cuenta
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </HeaderContainer>
        </header>
     );
}
 
export default Header;