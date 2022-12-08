import React from 'react';

const LogoIcon = () => {
  return (
    <img
      alt="Logo"
      width={'120'}
      height={'120'}
      src={process.env.PUBLIC_URL + '/icon.svg'}
    />
  );
};

export default LogoIcon;
