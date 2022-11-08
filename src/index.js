import React from 'react';

import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

import { AuthContextProvider } from './context/AuthContext';

import WebRoutes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>{<WebRoutes />}</AuthContextProvider>
  </React.StrictMode>
);
