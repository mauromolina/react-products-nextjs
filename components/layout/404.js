import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Button } from '../../components/ui/Button';



const ErrorContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const TextContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    h1 {
        font-size: 5rem;
        margin-top: 20px;
    }

    p {
        font-size: 2.5rem;
        padding: 20px;
        width: 60%;
        text-align: center;
    }
`;


const Error404 = ({msg}) => {
    return (
        <ErrorContent>
            <img src="/static/img/error.png"/>
            <TextContent>
                <h1>Page Not Found</h1>
                <p>{msg}</p>
                <Button bgColor="true">Volver al inicio</Button>
                <p
                    css={css`
                        margin-top: 100px;
                        width: 100%;
                    `}
                    >
                        &copy; Mauro Molina - 2020
                    </p>
            </TextContent>
        </ErrorContent>
     );
}
 
export default Error404;