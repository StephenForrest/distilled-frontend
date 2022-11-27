import React from 'react';
import { Helmet } from 'react-helmet-async';
import Sidebar from 'app/components/Sidebar';
import { Outlet } from 'react-router-dom';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Well hello" />
      </Helmet>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
}
