import {
    FETCH_AUTH_FAILURE,
    FETCH_AUTH_REQUEST,
    FETCH_AUTH_SUCCESS
} from "../Actions/AuthActions";

const initialState = {
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
        default:
            return state;
    }
};

export default authReducer;

