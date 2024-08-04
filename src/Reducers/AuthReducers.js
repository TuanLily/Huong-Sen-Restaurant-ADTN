import {
    FETCH_AUTH_FAILURE,
    FETCH_AUTH_REQUEST,
    FETCH_AUTH_SUCCESS,
    SHOW_SUCCESS_ALERT,
    SHOW_ERROR_ALERT
} from "../Actions/AuthActions";

const initialState = {
    successAlert: null,
    errorAlert: null,
    loading: false,
    auth: null,
    error: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_AUTH_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_AUTH_SUCCESS:
            return {
                loading: false,
                auth: Array.isArray(action.payload) ? action.payload : [],
                error: ''
            };
        case FETCH_AUTH_FAILURE:
            return {
                loading: false,
                auth: null,
                error: action.payload
            };
        case SHOW_SUCCESS_ALERT:
            return {
                ...state,
                successAlert: action.payload,
            };
        case SHOW_ERROR_ALERT:
            return {
                ...state,
                errorAlert: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;

