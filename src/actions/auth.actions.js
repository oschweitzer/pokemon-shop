import { LOGIN, LOGOUT } from './constants';

export const login = (user) => {
  return {
    type: LOGIN,
    email: user.email,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
