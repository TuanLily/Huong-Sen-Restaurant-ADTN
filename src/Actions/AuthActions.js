import axios from "axios";

export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST';
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE';
export const SHOW_SUCCESS_ALERT = 'SHOW_SUCCESS_ALERT';
export const SHOW_ERROR_ALERT = 'SHOW_ERROR_ALERT';

import { API_ENDPOINT } from "../Config/Client/APIs";
import ClientConfigRoute from '../Config/Client/routes';

export const fetchAuthRequest = () => ({
    type: FETCH_AUTH_REQUEST
});

export const fetchAuthSuccess = auth => ({
    type: FETCH_AUTH_SUCCESS,
    payload: auth
});

export const fetchAuthFailure = error => ({
    type: FETCH_AUTH_FAILURE,
    payload: error
});


export const showSuccessAlert = (message) => ({
    type: SHOW_SUCCESS_ALERT,
    payload: message,
});

export const showErrorAlert = (message) => ({
    type: SHOW_ERROR_ALERT,
    payload: message,
});

// Hàm để kiểm tra người dùng trong cơ sở dữ liệu
// const checkUserExists = async (email) => {
//     try {
//         const response = await axios.get(`${API_ENDPOINT}/auth/login-google`, {
//             params: { email }
//         });
//         return response.data.user;
//     } catch (error) {
//         console.error('Error checking user existence', error);
//         throw error;
//     }
// };

const checkUserExists = async (email) => {
    try {
        const response = await axios.get(`${API_ENDPOINT}/auth/check-email`, { params: { email } });
        return response.data.exists ? response.data.user : null;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
};



export const fetchGoogleAuth = (userData) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            // Gọi API để đăng nhập hoặc đăng ký người dùng Google
            const response = await axios.get(`${API_ENDPOINT}/auth/login-google`, {
                params: { email: userData.email }
            });

            const { user, accessToken } = response.data;

            // Lưu thông tin người dùng và accessToken vào localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', accessToken);

            // Dispatch thành công với thông tin người dùng
            dispatch(fetchAuthSuccess(user));
        } catch (error) {
            dispatch(fetchAuthFailure(error.message));
        }
    };
};

export const fetchLogin = (email, password) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/login`, { email, password });
            if (response.status === 200) {
                const data = response.data;
                console.log(data)
                dispatch(fetchAuthSuccess(data));
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem('user', JSON.stringify(data.user)); // Lưu toàn bộ đối tượng data
                localStorage.setItem('accessToken', data.accessToken);
            } else {
                dispatch(fetchAuthFailure('Unexpected response status: ' + response.status));
            }
        } catch (error) {
            dispatch(fetchAuthFailure(error.response ? error.response.data.message : error.message));
        }
    };
};

export const addNewCustomer = (customerData) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            // Gửi dữ liệu đến API
            const response = await axios.post(`${API_ENDPOINT}/auth/register`, customerData);
            if (response.status === 201) { // Đăng ký thành công, thường thì mã trạng thái là 201
                const data = response.data;
                console.log(data);
                dispatch(fetchAuthSuccess(data));
            } else {
                dispatch(fetchAuthFailure('Unexpected response status: ' + response.status));
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            dispatch(fetchAuthFailure(error.response ? error.response.data.message : error.message));
        }
    };
};

export const forgotPassword = (email) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            // Gửi dữ liệu đến API
            const response = await axios.post(`${API_ENDPOINT}/auth/forgot-password`, { email });
            if (response.status === 200) { // Yêu cầu thành công, mã trạng thái là 200
                const data = response.data;
                console.log(data)
                dispatch(fetchAuthSuccess(data));
                dispatch(showSuccessAlert('Email đặt lại mật khẩu đã được gửi'));
            } else {
                dispatch(fetchAuthFailure('Unexpected response status: ' + response.status));
                dispatch(showErrorAlert('Không thể gửi email đặt lại mật khẩu'));
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            dispatch(fetchAuthFailure(error.response ? error.response.data.message : error.message));
            dispatch(showErrorAlert(error.response ? error.response.data.message : error.message));
        }
    };
};

export const changePassword = (token, newPassword) => {
    return async dispatch => {
        dispatch(fetchAuthRequest());
        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/change-password`, { token, newPassword });
            if (response.status === 200) {
                const data = response.data;
                console.log(data)
                dispatch(fetchAuthSuccess(data));
                dispatch(showSuccessAlert('Đổi mật khẩu thành công'));
            } else {
                dispatch(fetchAuthFailure('Unexpected response status: ' + response.status));
                dispatch(showErrorAlert('Không thể đổi mật khẩu'));
            }
        } catch (error) {
            dispatch(fetchAuthFailure(error.response ? error.response.data.message : error.message));
            dispatch(showErrorAlert(error.response ? error.response.data.message : error.message));
        }
    };
};