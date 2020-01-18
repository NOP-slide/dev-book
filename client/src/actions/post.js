import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Add like
export const addLike = (postid) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postid}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {postid, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Remove like
export const removeLike = (postid) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postid}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {postid, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Delete a post
export const deletePost = (postid) => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postid}`);

        dispatch({
            type: DELETE_POST,
            payload: postid
        });

        dispatch(setAlert("Post removed", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Add a post
export const addPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/posts`, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert("Post created", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Get a single post
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Add a comment
export const addComment = (postid, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/posts/comment/${postid}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert("Comment added", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Delete comment
export const deleteComment = (postid, commentid) => async dispatch => {
    try {
        await axios.delete(`/api/posts/comment/${postid}/${commentid}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentid
        });

        dispatch(setAlert("Comment removed", "success"));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}