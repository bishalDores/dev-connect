import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST
} from "./types";

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText ? err.response.statusText : "",
        status: err.response.status ? err.response.status : ""
      }
    });
  }
};
// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText ? err.response.statusText : "",
        status: err.response.status ? err.response.status : ""
      }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  console.log(id);
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText ? err.response.statusText : "",
        status: err.response.status ? err.response.status : ""
      }
    });
  }
};
// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText ? err.response.statusText : "",
        status: err.response.status ? err.response.status : ""
      }
    });
  }
};

// Delete Post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });
    let deletePostPayload = {
      msg: "Post Removed",
      alertType: "success"
    };
    dispatch(setAlert(deletePostPayload));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText ? err.response.statusText : "",
        status: err.response.status ? err.response.status : ""
      }
    });
  }
};

// Add Post
export const addPost = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post("/api/posts", formData, config);
    // console.log(res);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    let addPostPayload = {
      msg: "Post Created",
      alertType: "success"
    };
    dispatch(setAlert(addPostPayload));
  } catch (err) {
    console.log(err.response);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
