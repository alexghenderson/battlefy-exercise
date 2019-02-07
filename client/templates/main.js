import React from 'react';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

// Simple CSS reset from https://alligator.io/css/minimal-css-reset/
const Reset = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
  }
`;

const MainTemplate = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <Reset />
    <GlobalStyle />
    <header
      css={`
        margin: 1rem;
        text-align: center;
      `}
    >
      LEAGUE OF LEGENDS
    </header>
    <main
      css={`
        margin-top: 12rem;
        display: flex;
        justify-content: center;
      `}
    >
      {children}
    </main>
  </>
);

export default MainTemplate;
