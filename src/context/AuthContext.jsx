import { createContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const AUTH_DATA = {
  user: null,
  authenticated: false,
  login: (email, password) => null,
  forgotPassword: (email) => null,
  forgotPasswordReset: (email, token, password, password_confirmation) => null,
  logout: () => null,
};

const status = {
  UNAUTHORIZED: 401,
  INVALIDDATA: 422,
};

export const AuthContext = createContext(AUTH_DATA);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authenticated = !!(user && user?.id);

  useEffect(() => {
    const token = getToken();

    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL + '/api';
    axios.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : null;

    if (token) {
      loadProfile();
    }
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/login', { email, password });

      setToken(data.token);
      setUser(data.user);

      toast.success(data.message);
    } catch (error) {
      if (
        error?.response?.status === status['UNAUTHORIZED'] &&
        error?.response?.data?.error
      ) {
        return toast.error(error?.response?.data?.error);
      }
    }
  };

  const loadProfile = async () => {
    try {
      const { data } = await axios.get('/profile');

      setUser(data.user);
    } catch (error) {
      if (error?.response?.status === status['UNAUTHORIZED']) {
        removeToken();
      }
    }
  };

  const forgotPassword = async (email) => {
    try {
      const { data } = await axios.post('/forgot-password', { email });

      toast.success(data.message);
    } catch (error) {
      if (
        error?.response?.status === status['UNAUTHORIZED'] &&
        error?.response?.data?.error
      ) {
        return toast.error(error?.response?.data?.error);
      }
    }
  };

  const forgotPasswordReset = async (
    email,
    token,
    password,
    password_confirmation
  ) => {
    try {
      const { data } = await axios.post('/forgot-password/verify', {
        email,
        token,
        password,
        password_confirmation,
      });

      toast.success(data.message);
    } catch (error) {
      if (
        error?.response?.status === status['UNAUTHORIZED'] &&
        error?.response?.data?.error
      ) {
        return toast.error(error?.response?.data?.error);
      }
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post('/logout');

      removeToken();
      setUser(null);

      toast.success(data.message);
    } catch (error) {
      if (
        error?.response?.status === status['UNAUTHORIZED'] &&
        error?.response?.data?.error
      ) {
        return toast.error(error?.response?.data?.error);
      }
    }
  };

  const setToken = (token) => {
    localStorage.setItem('token', token);

    Cookies.set('token', token);

    axios.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : null;
  };

  const removeToken = () => {
    localStorage.removeItem('token');

    Cookies.remove('token');
  };

  const getToken = () => {
    return localStorage.getItem('token') || Cookies.get('token');
  };

  const value = {
    user,
    authenticated,
    login,
    loadProfile,
    forgotPassword,
    forgotPasswordReset,
    logout,
  };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
};

export default AuthContext;
