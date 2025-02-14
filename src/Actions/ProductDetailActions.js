import axios from "axios";

export const FETCH_PRODUCT_DETAIL_REQUEST = 'FETCH_PRODUCT_DETAIL_REQUEST';
export const FETCH_PRODUCT_DETAIL_SUCCESS = 'FETCH_PRODUCT_DETAIL_SUCCESS';
export const FETCH_PRODUCT_DETAIL_FAILURE = 'FETCH_PRODUCT_DETAIL_FAILURE';

import { API_ENDPOINT, API_DATA } from "../Config/Client/APIs";

export const fetchProductDetailRequest = () => ({
    type: FETCH_PRODUCT_DETAIL_REQUEST
});

export const fetchProductDetailSuccess = productDetail => ({
    type: FETCH_PRODUCT_DETAIL_SUCCESS,
    payload: productDetail
});

export const fetchProductDetailFailure = error => ({
    type: FETCH_PRODUCT_DETAIL_FAILURE,
    payload: error
});

export const fetchProductDetail = (productId) => {
    return dispatch => {
        dispatch(fetchProductDetailRequest());
        axios.get(`${API_ENDPOINT}/${API_DATA.product}/${productId}`)
            .then(response => {
                const productDetail = response.data.data;
                dispatch(fetchProductDetailSuccess(productDetail));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductDetailFailure(errorMsg));
            });
    };
};

export const fetchProductDetailBySlug = (slug) => {
    return dispatch => {
        dispatch(fetchProductDetailRequest());
        axios.get(`${API_ENDPOINT}/${API_DATA.product}/slug/${slug}`)
            .then(response => {
                const productDetail = response.data.data; 
                dispatch(fetchProductDetailSuccess(productDetail));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchProductDetailFailure(errorMsg));
            });
    };
};
