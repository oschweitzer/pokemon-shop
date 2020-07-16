import { LOGIN, LOGOUT } from '../actions/constants';

const initialState = {
  isLoggedIn: false,
  email: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        isLoggedIn: true,
        email: action.user.email,
      };
    }
    case LOGOUT: {
      return {
        isLoggedIn: false,
        email: '',
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
