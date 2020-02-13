import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = payload => dispatch => {
  const { msg, alertType } = payload;
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
