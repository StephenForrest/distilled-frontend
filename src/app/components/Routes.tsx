import React from 'react';
import PrivateRoute from './PrivateRoute';
import NonAuthenticatedRoute from './NonAuthenticatedRoute';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage/Loadable';
import { SignupPage } from '../pages/SignupPage/Loadable';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from './NotFoundPage/Loadable';

export const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<PrivateRoute Component={HomePage} />}></Route>

    <Route
      path="/login"
      element={<NonAuthenticatedRoute Component={LoginPage} />}
    />
    <Route
      path="/signup"
      element={<NonAuthenticatedRoute Component={SignupPage} />}
    />

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default RoutesComponent;
