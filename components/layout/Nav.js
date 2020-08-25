import React, {useContext} from 'react';
import Link from 'next/link'
import styled from '@emotion/styled';
import {FirebaseContext} from '../../firebase';

const Navbar = styled.nav`
    padding-left: 2rem;

    a {
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gray2);
        font-family: 'PT Sans', sans-serif

        &:last-of-type {
            margin-right: 0
        }

    }

`;

const Nav = () => {

    const { user } = useContext(FirebaseContext);

    return ( 
        <Navbar>
            <Link href="/"><a>Inicio</a></Link>
            <Link href="/popular"><a>Populares</a></Link>
            {user && (
                        <Link href="/newProduct">
                            <a>Nuevo Producto</a>
                        </Link>
                    )
            }
            
        </Navbar>
     );
}
 
export default Nav;