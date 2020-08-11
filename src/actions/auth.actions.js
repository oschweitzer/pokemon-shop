import { LOGIN, LOGOUT } from './constants';

export const login = (email) => {
  return {
    type: LOGIN,
    user: {
      email,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
