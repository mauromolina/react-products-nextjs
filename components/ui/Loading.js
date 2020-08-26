import React from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';
import { TextContent } from '../../components/layout/404';

const loader = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  25% {
    transform: rotate(180deg);
  }
  
  50% {
    transform: rotate(180deg);
  }
  
  75% {
    transform: rotate(360deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

const loaderInner = keyframes`
  0% {
    height: 0%;
  }
  
  25% {
    height: 0%;
  }
  
  50% {
    height: 100%;
  }
  
  75% {
    height: 100%;
  }
  
  100% {
    height: 0%;
  }
`;
 

export const Loader = styled.span`
  width: 30px;
  height: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 4px solid #da552f;
  top: 50%;
  animation: ${loader} 2s infinite ease;
`;

export const LoaderInner = styled.span`
  text-align: center;
  line-height: 30px;
  color: #fff;
  font-family: 'PT Sans', sans-serif;
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #da552f;
  animation: ${loaderInner} 2s infinite ease-in;
`;

const Loading = ({msg}) => {
    return ( 
        <>
        <div 
          className="container"
          css={css`
            display: flex;
            align-items:center;
            justify-content: center;
            flex-direction: column;
            height: 100vh;
          `}>
            <Loader>
              <LoaderInner>M</LoaderInner>
            </Loader>
            <TextContent><span css={ css` margin-top: 10px; font-size: 1.6rem;`}>{msg}</span></TextContent>
          </div>
        </>
     );
}
 
export default Loading;