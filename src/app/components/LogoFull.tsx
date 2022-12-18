import React from 'react';

const LogoFull = () => {
  return <img alt="Logo" src={process.env.PUBLIC_URL + '/wordmark.svg'} />;
};

export const LogoFullBlack = () => {
  return (
    <img
      width="200px"
      alt="Logo"
      src={process.env.PUBLIC_URL + '/wordmark-black.png'}
    />
  );
};

export default LogoFull;
