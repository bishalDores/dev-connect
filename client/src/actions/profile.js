import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from './types';

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText ? err.response.statusText : '',
        status: err.response.status ? err.response.status : ''
      }
    });
  }
};

// Create or update profile

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/profile', formData, config);
    let editStatus = edit ? 'Profile Updated' : 'Profile Created';

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    let editStatusPayload = {
      msg: editStatus,
      alertType: 'success'
    };
    dispatch(setAlert(editStatusPayload));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        let errorPaylaod = {
          msg: error.msg,
          alertType: 'danger'
        };
        dispatch(setAlert(errorPaylaod));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Experience

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/api/profile/experience', formData, config);
    let successStatus = 'Experience Added';

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    let statusPayload = {
      msg: successStatus,
      alertType: 'success'
    };
    dispatch(setAlert(statusPayload));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        let errorPaylaod = {
          msg: error.msg,
          alertType: 'danger'
        };
        dispatch(setAlert(errorPaylaod));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put('/api/profile/education', formData, config);
    let successStatus = 'Education Added';

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    let statusPayload = {
      msg: successStatus,
      alertType: 'success'
    };
    dispatch(setAlert(statusPayload));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        let errorPaylaod = {
          msg: error.msg,
          alertType: 'danger'
        };
        dispatch(setAlert(errorPaylaod));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
