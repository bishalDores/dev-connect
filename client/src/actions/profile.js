import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from "./types";

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText ? err.response.statusText : "",
        status: err.response.status ? err.response.status : ""
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
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post("/api/profile", formData, config);
    let editStatus = edit ? "Profile Updated" : "Profile Created";

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    let editStatusPayload = {
      msg: editStatus,
      alertType: "success"
    };
    dispatch(setAlert(editStatusPayload));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        let errorPaylaod = {
          msg: error.msg,
          alertType: "danger"
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
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put("/api/profile/experience", formData, config);
    let successStatus = "Experience Added";

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    let statusPayload = {
      msg: successStatus,
      alertType: "success"
    };
    dispatch(setAlert(statusPayload));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        let errorPaylaod = {
          msg: error.msg,
          alertType: "danger"
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
        "Content-Type": "application/json"
      }
    };
    const res = await axios.put("/api/profile/education", formData, config);
    let successStatus = "Education Added";

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    let statusPayload = {
      msg: successStatus,
      alertType: "success"
    };
    dispatch(setAlert(statusPayload));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        let errorPaylaod = {
          msg: error.msg,
          alertType: "danger"
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

// Delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    let deleteStatus = {
      msg: "Experience Removed",
      alertType: "success"
    };
    dispatch(setAlert(deleteStatus));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    let deleteStatus = {
      msg: "Education Removed",
      alertType: "success"
    };
    dispatch(setAlert(deleteStatus));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete account & profile

export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure ? This can NOT be undone!")) {
    try {
      const res = await axios.delete("/api/profile");
      dispatch({
        type: CLEAR_PROFILE
      });
      dispatch({
        type: ACCOUNT_DELETED
      });
      let deleteStatus = {
        msg: "Your account has been permanantly deleted",
        alertType: "success"
      };
      dispatch(setAlert(deleteStatus));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
