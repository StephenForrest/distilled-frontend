import React from 'react';
import PrivateRoute from './PrivateRoute';
import NonAuthenticatedRoute from './NonAuthenticatedRoute';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage/Loadable';
import { SignupPage } from '../pages/SignupPage/Loadable';
import { HomePage } from '../pages/HomePage';
import { DashboardPage } from '../pages/Dashboard/Loadable';
import { IntegrationsPage } from '../pages/Integrations/Loadable';
import { SettingsPage } from '../pages/SettingsPage/Loadable';
import { RedirectUrl } from '../pages/Integrations/RedirectUrl';
import { PlanPage } from '../pages/PlanPage/Loadable';
import { AllPlans } from '../pages/AllPlans/Loadable';
import { NotFoundPage } from './NotFoundPage/Loadable';
import { VerifyEmail } from '../pages/VerifyEmail/Loadable';
import { AnimatePresence } from 'framer-motion';

export const RoutesComponent = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode={'wait'} exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PrivateRoute Component={HomePage} />}>
          <Route
            path="/"
            element={<PrivateRoute Component={DashboardPage} />}
          />
          <Route path="plans" element={<PrivateRoute Component={AllPlans} />} />
          <Route
            path="integrations"
            element={<PrivateRoute Component={IntegrationsPage} />}
          />
          <Route
            path="settings"
            element={<PrivateRoute Component={SettingsPage} />}
          />
          <Route
            path="plan/:uuid"
            element={<PrivateRoute Component={PlanPage} />}
          />
        </Route>

        <Route
          path="/login"
          element={<NonAuthenticatedRoute Component={LoginPage} />}
        />
        <Route
          path="/signup"
          element={<NonAuthenticatedRoute Component={SignupPage} />}
        />

        <Route
          path="oauth-slack"
          element={<PrivateRoute Component={RedirectUrl} />}
        />

        <Route path="verify-email" element={<VerifyEmail />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default RoutesComponent;
