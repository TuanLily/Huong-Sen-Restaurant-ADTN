import axios from "axios";

export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST';
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE';

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
            // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu hay không
            const existingUser = await checkUserExists(userData.email);
            if (existingUser) {
                // Người dùng đã tồn tại, thực hiện đăng nhập
                dispatch(fetchAuthSuccess(existingUser));
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem('user', JSON.stringify(existingUser));
            } else {
                // Người dùng không tồn tại, thực hiện đăng ký và lưu thông tin
                const response = await axios.post(`${API_ENDPOINT}/auth/register-google`, userData);
                dispatch(fetchAuthSuccess(response.data.user));
                // Lưu thông tin người dùng vào localStorage
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
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


// export const addCustomer = (customer) => {
//     return dispatch => {
//         dispatch(fetchCustomerRequest());
//         axios.post(`${API_ENDPOINT}/${AdminConfig.routes.customer}`, customer)
//             .then((response) => {
//                 // Sau khi thêm khách hàng mới, gọi lại fetchCustomer để làm mới danh sách
//                 dispatch(fetchCustomerSuccess(response.data.data));
//                 dispatch(fetchCustomer());
//             })
//             .catch(error => {
//                 const errorMsg = error.message;
//                 dispatch(fetchCustomerFailure(errorMsg));
//             });
//     };
// };


// export const updateCustomer = (id, data) => {
//     return (dispatch) => {
//         dispatch(fetchCustomerRequest());
//         axios.patch(`${API_ENDPOINT}/${AdminConfig.routes.customer}/${id}`, data)
//             .then((response) => {
//                 dispatch(fetchCustomerSuccess(response.data.data));
//                 dispatch(fetchCustomer()); // Reload danh sách khách hàng sau khi cập nhật
//             })
//             .catch((error) => {
//                 dispatch(fetchCustomerFailure(error.message));
//             });
//     };
// };

// export const deleteCustomer = (id) => {
//     return dispatch => {
//         dispatch(fetchCustomerRequest());
//         axios.delete(`${API_ENDPOINT}/${AdminConfig.routes.customer}/${id}`)
//             .then(() => {
//                 // Sau khi xóa khách hàng, gọi lại fetchCustomer để làm mới danh sách
//                 dispatch(fetchCustomer());
//             })
//             .catch((error) => {
//                 const errorMsg = error.message;
//                 dispatch(fetchCustomerFailure(errorMsg));
//             });
//     };
// };