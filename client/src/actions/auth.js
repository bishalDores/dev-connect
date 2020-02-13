import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import { setAlert } from './alert';

// Register user
export const register = payload => async dispatch => {
  const { name, email, password } = payload;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => {
        let payload = {
          msg: error.msg,
          alertType: 'danger'
        };
        dispatch(setAlert(payload));
      });
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
