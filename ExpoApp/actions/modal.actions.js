import { ACTIVATE_MODAL, DEACTIVATE_MODAL } from './constants';

export const activateModal = () => {
  return {
    type: ACTIVATE_MODAL,
  };
};

export const deactivateModal = () => {
  return {
    type: DEACTIVATE_MODAL,
  };
};
