import { LOGIN, LOGOUT } from '../actions/constants';

const initialState = {
  isModalActivated: false,
  isLoggedIn: false,
  email: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLoggedIn: true,
        email: action.email,
      };
    }
    case LOGOUT: {
      return {
        ...state,
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
