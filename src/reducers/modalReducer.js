import { ACTIVATE_MODAL, DEACTIVATE_MODAL } from '../actions/constants';

const initialState = {
  isModalActivated: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE_MODAL: {
      return {
        ...state,
        isModalActivated: true,
      };
    }
    case DEACTIVATE_MODAL: {
      return {
        ...state,
        isModalActivated: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default modalReducer;
