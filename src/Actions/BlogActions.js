import axios from "axios";

export const FETCH_BLOG_REQUEST = 'FETCH_BLOG_REQUEST';
export const FETCH_BLOG_SUCCESS = 'FETCH_BLOG_SUCCESS';
export const FETCH_BLOG_FAILURE = 'FETCH_BLOG_FAILURE';

import { API_ENDPOINT, API_DATA } from "../Config/Client/APIs";

export const fetchBlogRequest = () => ({
    type: FETCH_BLOG_REQUEST
});

export const fetchBlogSuccess = blog => ({
    type: FETCH_BLOG_SUCCESS,
    payload: blog
});

export const fetchBlogFailure = error => ({
    type: FETCH_BLOG_FAILURE,
    payload: error
});

export const fetchBlog = () => {
    return dispatch => {
        dispatch(fetchBlogRequest());
        axios.get(`${API_ENDPOINT}${API_DATA.blog}`)
            .then(response => {
                const blog = response.data.results;
                dispatch(fetchBlogSuccess(blog));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchBlogFailure(errorMsg));
            });
    };
};