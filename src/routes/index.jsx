import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';

import { Toaster } from 'react-hot-toast';

import { FaSpinner } from 'react-icons/fa';

import GuestMiddleware from './middleware/GuestMiddleware';
import AuthMiddleware from './middleware/AuthMiddleware';

import Navbar from '../components/Navbar';
import { Container } from 'react-bootstrap';

const Login = lazy(() =>
  import(/* webpackChunkName:'Login' */ '../pages/Login')
);

const ForgotPassword = lazy(() =>
  import(/* webpackChunkName:'ForgotPassword' */ '../pages/ForgotPassword')
);

const ForgotPasswordReset = lazy(() =>
  import(
    /* webpackChunkName:'ForgotPasswordReset' */ '../pages/ForgotPasswordReset'
  )
);

const Dashboard = lazy(() =>
  import(/* webpackChunkName:'Dashboard' */ '../pages/Dashboard')
);

const WebRoutes = () => (
  <BrowserRouter>
    <Navbar />
    <Suspense
      fallback={
        <Container>
          <FaSpinner
            className='rotate'
            size={'30'}
          />
        </Container>
      }
    >
      <Routes>
        <Route
          element={
            <GuestMiddleware>
              <Login />
            </GuestMiddleware>
          }
          path={'/'}
        />
        <Route
          element={
            <GuestMiddleware>
              <ForgotPassword />
            </GuestMiddleware>
          }
          path={'/forgot-password'}
        />
        <Route
          element={
            <GuestMiddleware>
              <ForgotPasswordReset />
            </GuestMiddleware>
          }
          path={'/forgot-password/:token/reset'}
        />
        <Route
          element={
            <AuthMiddleware>
              <Dashboard />
            </AuthMiddleware>
          }
          path={'/dashboard'}
        />
      </Routes>
    </Suspense>
    <Toaster />
  </BrowserRouter>
);

export default WebRoutes;
