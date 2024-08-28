import {
    FETCH_BLOG_FAILURE,
    FETCH_BLOG_REQUEST,
    FETCH_BLOG_SUCCESS
} from '../Actions/BlogActions';


const initialState = {
    loading: false,
    blogs: [],
    error: ''
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BLOG_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            };
        case FETCH_BLOG_SUCCESS:
            return {
                loading: false,
                blog: Array.isArray(action.payload) ? action.payload : [],
                error: ''
            };
        case FETCH_BLOG_FAILURE:
            return {
                loading: false,
                blog: [],
                error: action.payload
            };
        default:
            return state;
    }
};

export default blogReducer;

